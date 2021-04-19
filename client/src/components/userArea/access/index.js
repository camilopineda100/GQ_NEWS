import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const UserAccess = () => {
    const [type, setType] = useState(true)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Sorry the email is required'),
            password: Yup.string()
                .min(5, 'Must be more than 5 characters')
                .required('Sorry password is required')
        }),
        onSubmit: values => {
            console.log(values)
        }
    })

    const switchTypeHandler = () => {
        setType(!type)
    }
    return(
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col>
                        <h1>Sign in / Register</h1>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                     {formik.touched.email && formik.errors.email ? 
                        <Alert variant="danger">{formik.errors.email}</Alert>
                        : null
                    }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? 
                        <Alert variant="danger">{formik.errors.password}</Alert>
                        : null
                    }
                </Form.Group>

                { type ? 
                    <Button variant="primary" type="submit">Sign in</Button>
                    : 
                    <Button variant="primary" type="submit">Register</Button>
                }
                <Button 
                    variant="secondary" 
                    className="ml-2"
                    onClick={switchTypeHandler}
                >
                    Already { type ? "Signed in" : "Registered" } ? click here
                </Button>
            </Form>
        </>
    )
}

export default UserAccess