import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Alert } from 'react-bootstrap'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastHandler from '../../utils/toasts'
import UserAreaHOC from '../../hoc/userAreaHoc'

import { getCategories } from '../../../api'
import { createPost, clearCreatedPost } from '../../../store/actions'

const CreateArticles = () => {
    const [categories, setCategories] = useState(null)
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            excerpt: "",
            content: "",
            status: "",
            category: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().required('This field is required'),
            excerpt: Yup.string().required('This field is required'),
            content: Yup.string().required('This field is required'),
            status: Yup.string().required('This field is required').matches(/(DRAFT|PUBLIC)/, { 
                message: 'It should be DRAFT or PUBLIC', 
                excludeEmptyString: true
            }),
            category: Yup.string().required('This field is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(createPost(values)).then(({payload}) => {
                if(payload.createdPost.post) {
                    ToastHandler('Done!!', 'SUCCESS')
                    resetForm()
                }
                if(payload.createdPost.error) {
                    ToastHandler(payload.createdPost.error, 'ERROR')
                }
            })
        }
    })

    useEffect(() => {
        const func = async () => {
            const response = await getCategories()
            setCategories(response.data.categories)
        }
        func()
    }, [setCategories])

    useEffect(() => () => dispatch(clearCreatedPost()), [dispatch])

    return (
        <UserAreaHOC>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" id="title" name="title"
                        placeholder="Enter the title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                     {formik.touched.title && formik.errors.title ? 
                        <Alert variant="danger">{formik.errors.title}</Alert>
                        : null
                    }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Excerpt</Form.Label>
                    <Form.Control as="textarea" rows={3} id="excerpt" name="excerpt"
                        placeholder="Enter the excerpt"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.excerpt}
                    />
                     {formik.touched.excerpt && formik.errors.excerpt ? 
                        <Alert variant="danger">{formik.errors.excerpt}</Alert>
                        : null
                    }
                </Form.Group>

                <hr/>

                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} id="content" name="content"
                        placeholder="Enter the content"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                    />
                     {formik.touched.content && formik.errors.content ? 
                        <Alert variant="danger">{formik.errors.content}</Alert>
                        : null
                    }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" id="category" name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    >
                        <option></option>
                        { categories ?
                            categories.map((item, idx) => (
                                <option key={idx} value={item._id}>{item.name}</option>
                            ))
                            :
                            null
                        }
                    </Form.Control>
                     {formik.touched.category && formik.errors.category ? 
                        <Alert variant="danger">{formik.errors.category}</Alert>
                        : null
                    }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" id="status" name="status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                    >
                        <option></option>
                        <option value="DRAFT">DRAFT</option>
                        <option value="PUBLIC">PUBLIC</option>
                    </Form.Control>
                     {formik.touched.status && formik.errors.status ? 
                        <Alert variant="danger">{formik.errors.status}</Alert>
                        : null
                    }
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add post
                </Button>
            </Form>
        </UserAreaHOC>
    )
}

export default CreateArticles