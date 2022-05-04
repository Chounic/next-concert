import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Concert+One&family=Courgette&family=Kalam:wght@300&family=Kaushan+Script&family=Mukta:wght@400;700&family=Radio+Canada:wght@400;600&family=Signika:wght@400;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main  />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument