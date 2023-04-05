import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Head from 'next/head'
import { useRouter } from 'next/router'

// components
import Loader from '@kvitkaphoto/components/loader/Loader'
// constants
import {
  API,
  KVITKAPHOTO_ACCESS_TOKEN,
  KVITKAPHOTO_REFRESH_TOKEN,
  LOGO,
  ROUTES
} from '@kvitkaphoto/constants'
import Trans from '@kvitkaphoto/translation/en.json'

const Login = () => {
  const router = useRouter()
  const [email, setMail] = useState('')
  const [pass, setPass] = useState('')
  const [session, setSession] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const isBtnDisabled = email === '' && pass === ''

  useEffect(() => {
    if (session) {
      router.push(ROUTES.ADMIN)
    }
  }, [session, router])

  const signIn = async () => {
    try {
      setLoading(true)
      const response = await fetch(API.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: pass
        })
      })

      const res = await response.json()
      if (res.error) throw res.error
      console.log('>>> login', res)

      const session = res.session

      const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
      // const maxAge = 10;
      document.cookie = `${KVITKAPHOTO_ACCESS_TOKEN}=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
      document.cookie = `${KVITKAPHOTO_REFRESH_TOKEN}=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`

      setSession(res.session)
      await fetch(API.AUTH)
      setLoading(false)
    } catch (error: any) {
      toast(error.message, {
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOnSubmit = async (e: any) => {
    e.preventDefault()
    await signIn()
  }
  const handleOnEmail = (e: any) => setMail(e.target.value)
  const handleOnPass = (e: any) => setPass(e.target.value)

  return (
    <>
      <Head>
        <title>{`${Trans.helmet_title_login} | ${LOGO}`}</title>
      </Head>

      <Container>
        <Row>
          <Col
            sm={{
              offset: 3,
              span: 6
            }}
          >
            <Card>
              <Card.Body aria-live="polite">
                <h1 className="mb-4">Admin panel</h1>
                <Loader isLoading={isLoading} text="Singing In...">
                  <Form onSubmit={handleOnSubmit}>
                    <InputGroup className="mb-4">
                      <FormControl
                        autoComplete="off"
                        id="email"
                        type="mail"
                        placeholder="Email"
                        value={email}
                        onChange={handleOnEmail}
                      />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <FormControl
                        autoComplete="off"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={handleOnPass}
                      />
                    </InputGroup>

                    <div className="d-grid">
                      <Button
                        variant="success"
                        className="text-uppercase"
                        type="submit"
                        disabled={isBtnDisabled}
                      >
                        Sign In
                      </Button>
                    </div>
                  </Form>
                </Loader>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login

// export async function getServerSideProps() {
//   // const refreshToken = req.cookies["my-refresh-token"];
//   // const accessToken = req.cookies["my-access-token"];
//   // console.log(">>> refreshToken", refreshToken);
//   // console.log(">>> accessToken", accessToken);
//   // const { user } = await supabase.auth.api.getUserByCookie(req);
//   // console.log(">>> user", user);
//   // const user = await supabase.auth.getUser();
//   // console.log(">>>> user 2", user);
//   // const res = await fetch(`http://localhost:3000/api/gallery`);
//   // const data = await res.json();
//   //
//   // console.log("get data api 2", data);
//   //
//   // // Pass data to the page via props
//   return {
//     props: {
//       test: "test",
//     },
//   };
// }
