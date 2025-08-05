import Footer from './footer'
import { MOCK_FOOTER_DATA } from './footer.container.const'

const FooterContainer = async () => {
  const { footer } = MOCK_FOOTER_DATA

  return <Footer data={footer} />
}

export default FooterContainer
