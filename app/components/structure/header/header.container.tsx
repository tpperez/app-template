import Header from './header'
import { MOCK_HEADER_DATA } from './header.container.const'

const HeaderContainer = async () => {
  const { header } = MOCK_HEADER_DATA

  return <Header data={header} />
}

export default HeaderContainer
