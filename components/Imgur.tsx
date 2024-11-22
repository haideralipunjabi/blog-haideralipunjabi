import NextImage from 'next/image'

const Imgur = ({ id, ext, title, ...rest }: { id: string; ext: string; title: string }) => (
  <div className="relative text-center">
    <NextImage
      style={{ width: '100%', height: 'auto' }}
      sizes="100vw"
      width={0}
      height={0}
      alt={title}
      src={`https://i.imgur.com/${id}.${ext}`}
    />
    <br />
    <span>{title}</span>
  </div>
)

export default Imgur
