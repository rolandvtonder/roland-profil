import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import CaseStudyView from '../pages/CaseStudyView'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CaseStudyView slug="group-travel-website" />
  </StrictMode>,
)
