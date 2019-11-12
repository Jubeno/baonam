import Footer from '../footer/Footer'
import Header from '../header/Header'

export default ({ children }) => (
  <React.Fragment>
    <Header/>
    <main id="main" className="main-content clearfix">
      {children}
    </main>
    <Footer />
  </React.Fragment>
)
