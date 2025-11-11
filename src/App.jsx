import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import DataGenerator from './pages/DataGenerator'
import ApiValidator from './pages/ApiValidator'
import FileConverter from './pages/FileConverter'
import RegexTester from './pages/RegexTester'
import TestChecklist from './pages/TestChecklist'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-generator" element={<DataGenerator />} />
        <Route path="/api-validator" element={<ApiValidator />} />
        <Route path="/file-converter" element={<FileConverter />} />
        <Route path="/regex-tester" element={<RegexTester />} />
        <Route path="/test-checklist" element={<TestChecklist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
