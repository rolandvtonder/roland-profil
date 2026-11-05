import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import SectionPageView from '../pages/SectionPageView'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SectionPageView slug="services" />
  </StrictMode>,
)
