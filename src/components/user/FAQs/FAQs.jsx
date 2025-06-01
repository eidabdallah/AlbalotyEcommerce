import { useForm } from 'react-hook-form';
import { Container, Form, Button } from 'react-bootstrap';
import { FaCreditCard, FaTruck, FaCheckCircle, FaUndo, FaQuestion } from 'react-icons/fa';
import styles from './FAQs.module.css';
import ToastMessage from './../../shared/ToastMessage/ToastMessage.jsx';

export default function FAQs() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const faqData = [
        {
            question: "How can I pay?",
            answer: "You can currently pay by cash on delivery only.",
            icon: <FaCreditCard className={styles.icon} />
        },
        {
            question: "How long does shipping take?",
            answer: "Shipping usually takes 2–5 days within Palestine ",
            icon: <FaTruck className={styles.icon} />
        },
        {
            question: "Is there a warranty on products?",
            answer: "Yes, all products come with a one-year warranty against manufacturing defects.",
            icon: <FaCheckCircle className={styles.icon} />
        },
        {
            question: "Can I return a product?",
            answer: "Yes, you can return any product within 30 days as long as it's in its original condition.",
            icon: <FaUndo className={styles.icon} />
        }
    ];

    const onSubmit = (data) => {
        ToastMessage({ message: "Submitted successfully, your question will be answered as soon as possible", type: "success", });
        reset();
    };

    return (
        <div className={styles.faqSection}>
            <Container>
                <h2 className={`text-center fw-bold ${styles.title}`}>
                    Frequently Asked Questions
                </h2>

                <div className={styles.faqGrid}>
                    {faqData.map((item, index) => (
                        <div key={index} className={styles.faqCard}>
                            <div className={styles.cardHeader}>
                                {item.icon}
                                <h5 className={styles.question}>{item.question}</h5>
                            </div>
                            <p className={styles.answer}>{item.answer}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.askBox}>
                    <div className={styles.askHeader}>
                        <h4 className="fw-semibold mb-2 text-black">
                            Still have a question
                            <span className={styles.askIcon}><FaQuestion /></span>
                        </h4>
                        <p className="fw-bold fs-5 text-black">Let us know and we’ll get back to you shortly.</p>
                    </div>

                    <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group >
                            <Form.Control
                                type="email"
                                placeholder="Your email"
                                className={styles.input}
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <small className="text-danger">{errors.email.message}</small>}
                        </Form.Group>

                        <Form.Group >
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Type your question..."
                                className={styles.textarea}
                                {...register("question", { required: "Please enter your question" })}
                            />
                            {errors.question && <small className="text-danger">{errors.question.message}</small>}
                        </Form.Group>

                        <Button type="submit" variant="dark" className={styles.submitBtn}>
                            Submit Question
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}
