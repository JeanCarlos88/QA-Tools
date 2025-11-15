import React, { useState, useEffect } from 'react'
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
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')

    return savedTheme ? savedTheme : 'dark'
  }

  const [theme, setTheme] = useState(getInitialTheme)

//EFEITO: aplica a classe 'dark' no <html> e salva no localStorage
useEffect(() =>{
  const htmlElement = document.documentElement //alvo: a tag html

  if(theme === 'dark'){
    htmlElement.classList.add('dark')
  }else{
    htmlElement.classList.remove('dark')
  }
  localStorage.setItem('theme', theme)
}, [theme])//roda toda vez que o 'theme' muda

const toggleTheme = () => {
  setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'))
}

/*
      NOTA: A função 'setTheme' (que altera o tema) precisará ser passada 
      via props para o componente Layout (ou o componente que contém o botão de toggle).
    */

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>  
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
