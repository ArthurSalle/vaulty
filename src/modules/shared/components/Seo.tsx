import favicon from '../../../assets/img/lock.svg'
import { Helmet } from 'react-helmet'

const Seo = () => {
  const faviconLink = [
    { rel: 'icon', type: 'image/ico', sizes: '32x32', href: favicon },
  ]

  const title = 'Vaulty'

  const description =
    'Store your confidential information like passwords, credit cards & identities.'

  const url = 'https://vaulty.vercel.app/'

  return (
    <Helmet htmlAttributes={{ lang: 'en' }} link={faviconLink}>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
    </Helmet>
  )
}

export default Seo
