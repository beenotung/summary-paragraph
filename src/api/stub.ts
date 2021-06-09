import { splitText, addStopWord } from 'meta-stopwords'

addStopWord('{')
addStopWord('}')

type SummaryReport = {
  id: number
  paragraphs: string[]
  keywords: string[]
}

export const api = {
  post: {
    '/summary': async (req: { body: { text: string; sentence: number } }) => {
      const text = req.body.text
      const sentence = +req.body.sentence || 7
      console.log('POST /summary')
      if (Math.random() < 0.5) {
        console.log('random error')
        throw new Error('server timeout (50% chance), please retry later')
      }
      console.log('processing')

      const keywords: Record<string, number> = {}

      let paragraphs = text
        .split('\n')
        .filter(line => line.length > 0)
        .map((line, index) => {
          let words = splitText(line)
          words.forEach(word => {
            let count = keywords[word] || 0
            keywords[word] = count + 1
          })
          return {
            line,
            index,
            words,
            weight: 0,
          }
        })

      paragraphs.forEach(paragraph => {
        paragraph.weight = paragraph.words.reduce(
          (acc, c) => acc + keywords[c] || 1,
          0,
        )
      })

      let result: SummaryReport = {
        id: Date.now(),
        paragraphs: paragraphs
          .sort((a, b) => b.weight - a.weight)
          .slice(0, sentence)
          .sort((a, b) => a.index - b.index)
          .map(paragraph => paragraph.line),
        keywords: Object.keys(keywords),
      }
      localStorage.setItem('report-' + result.id, JSON.stringify(result))
      return result
    },
  },
  get: {
    '/report/id-list': async () => {
      let idList: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        if (key?.startsWith('report-')) {
          idList.push(key.replace('report-', ''))
        }
      }
      return idList
    },
    '/report/:id': async (req: { params: { id: string } }) => {
      let report = localStorage.getItem('report-' + req.params.id)
      if (!report) {
        throw new Error('report not found')
      }
      return JSON.parse(report) as SummaryReport
    },
  },
}
