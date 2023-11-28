import Layout from './components/layout/Layout'
import { ThemeProvider } from './components/themes/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Layout />
    </ThemeProvider>
  )
}

export default App
