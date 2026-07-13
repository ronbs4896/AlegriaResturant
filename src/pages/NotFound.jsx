import { Helmet } from 'react-helmet-async'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>הדף לא נמצא · מסעדת אלגריה</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="flex min-h-[70vh] items-center bg-charcoal-950 text-cream">
        <Container className="text-center">
          <div className="text-8xl font-black text-orange">404</div>
          <h1 className="mt-4 text-3xl font-black sm:text-4xl">אופס, הדף לא נמצא</h1>
          <p className="mx-auto mt-3 max-w-md text-cream/70">
            כנראה שהמנה הזו כבר נגמרה. בואו נחזור לתפריט הראשי.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg" to="/">חזרה לעמוד הבית</Button>
            <Button variant="outline-light" size="lg" to="/contact">צור קשר</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
