import rehypePrism from 'rehype-prism-plus'
import Markdown from 'react-markdown'
const getContents = async (repo, file, lang, showLineNumbers, subLines) => {
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${file}`)
  const data = await response.json()
  const buffer = Buffer.from(data['content'], 'base64')
  let text = buffer.toString()
  let start = 1
  let end = -1
  if (subLines) {
    const array = text.split('\n')
    start = subLines.split('-')[0]
    end = subLines.split('-')[1]
    const subArray = array.slice(start - 1, end)
    text = subArray.join('\n')
  }
  return '```' + lang + (showLineNumbers ? ` showLineNumbers=${start}` : '') + '\n' + text + '```'
}
const Github = async ({
  repo,
  file,
  lang,
  showLineNumbers = false,
  subLines,
}: {
  repo: string
  file: string
  lang: string
  showLineNumbers: boolean
  subLines?: string
}) => (
  <Markdown rehypePlugins={[rehypePrism]}>
    {await getContents(repo, file, lang, showLineNumbers, subLines)}
  </Markdown>
)

export default Github
