import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import TestimonialPage from '../pages/TestimonialPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TestimonialPage />
  </StrictMode>,
)
