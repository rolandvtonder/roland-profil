import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import ServicePageView from '../pages/ServicePageView'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServicePageView slug="ecommerce" />
  </StrictMode>,
)
