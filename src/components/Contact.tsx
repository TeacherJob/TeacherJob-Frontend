import React, { useState } from 'react';
import { FiMail, FiShield, FiBriefcase, FiInfo, FiChevronsRight } from 'react-icons/fi';
import { GoLaw } from "react-icons/go";
import Footer from './Footer';
import Header from './Header';


const ContactPage = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.currentTarget);

        // IMPORTANT: Replace this with your own Access Key from Web3Forms.
        formData.append("access_key", "fb523674-253c-459d-b026-df4a89f7445c");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Form Submitted Successfully");
                event.currentTarget.reset();
            } else {
                console.log("Error from Web3Forms:", data);
                setResult(data.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setResult("An error occurred while submitting the form.");
        }

        setTimeout(() => {
            setResult("");
        }, 5000);
    };

    const contactDetails = [
        { title: 'Support', email: 'Support@teacherjob.in', icon: <FiMail /> },
        { title: 'Legal', email: 'Legal@teacherjob.in', icon: <GoLaw /> },
        { title: 'Privacy', email: 'Privacy@teacherjob.in', icon: <FiShield /> },
        { title: 'Employer', email: 'Employer@teacherjob.in', icon: <FiBriefcase /> },
        { title: 'Info', email: 'Info@teacherjob.in', icon: <FiInfo /> },
    ];

    const styles: { [key: string]: React.CSSProperties } = {
        pageWrapper: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#f7f9fc',
        },
        container: {
            fontFamily: "'Poppins', 'Segoe UI', 'Roboto', sans-serif",
            padding: '50px 20px',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        mainWrapper: {
            width: '100%',
            maxWidth: '1200px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'hidden',
        },
        infoSection: {
            background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #F97316 100%)',
            color: '#ffffff',
            padding: '60px 40px',
            flex: '1',
            minWidth: '350px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        infoHeader: {
            fontSize: '2.5rem',
            fontWeight: '600',
            marginBottom: '15px'
        },
        infoSubheader: {
            fontSize: '1.1rem',
            fontWeight: '300',
            lineHeight: '1.6',
            opacity: '0.9',
            marginBottom: '40px',
            maxWidth: '400px'
        },
        contactItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '25px',
            transition: 'transform 0.3s ease',
            textDecoration: 'none',
            color: 'inherit'
        },
        contactIcon: {
            fontSize: '1.5rem',
            marginRight: '20px',
            color: '#FDBA74'
        },
        contactTextContainer: {
            display: 'flex',
            flexDirection: 'column'
        },
        contactTitle: {
            fontWeight: '500',
            fontSize: '1.1rem'
        },
        contactEmail: {
            color: '#cde2ee',
            fontSize: '1rem',
            opacity: '0.8'
        },
        formSection: {
            padding: '60px 40px',
            flex: '1.5',
            minWidth: '350px'
        },
        formHeader: {
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '40px',
        },
        formGroup: {
            marginBottom: '25px',
            position: 'relative'
        },
        label: {
            display: 'block',
            marginBottom: '10px',
            color: '#4a5568',
            fontSize: '0.9rem',
            fontWeight: '600',
        },
        input: {
            width: '100%',
            padding: '14px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '1rem',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            backgroundColor: '#f7fafc',
        },
        textarea: {
            width: '100%',
            padding: '14px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '1rem',
            minHeight: '130px',
            resize: 'vertical',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            backgroundColor: '#f7fafc',
        },
        button: {
            width: '100%',
            padding: '16px',
            backgroundColor: '#F97316',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
        },
        resultSpan: {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '1rem',
            fontWeight: '500',
            minHeight: '24px',
        },
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = '#F97316';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.2)';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.boxShadow = 'none';
    };

    const handleButtonEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = '#EA580C';
        e.currentTarget.style.transform = 'translateY(-2px)';
    };

    const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = '#F97316';
        e.currentTarget.style.transform = 'translateY(0)';
    };

    return (
        <div style={styles.pageWrapper}>
            <Header />
            <div style={styles.container}>
                <div style={styles.mainWrapper}>
                    <div style={styles.infoSection}>
                        <h2 style={styles.infoHeader}>Contact Information</h2>
                        <p style={styles.infoSubheader}>Have a question or need help? Reach out to the right department.</p>
                        <div>
                            {contactDetails.map((detail, index) => (
                                <a href={`mailto:${detail.email}`} key={index} style={styles.contactItem}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                                >
                                    <div style={styles.contactIcon}>{detail.icon}</div>
                                    <div style={styles.contactTextContainer}>
                                        <span style={styles.contactTitle}>{detail.title}</span>
                                        <span style={styles.contactEmail}>{detail.email}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div style={styles.formSection}>
                        <h2 style={styles.formHeader}>Send a Message</h2>
                        <form onSubmit={onSubmit}>
                            <input type="hidden" name="access_key" value="fb523674-253c-459d-b026-df4a89f7445c" />
                            <input type="hidden" name="subject" value="New Contact Form Submission from TeacherJob.in" />
                            <input type="hidden" name="from_name" value="TeacherJob Contact Page" />

                            <div style={styles.formGroup}>
                                <label htmlFor="name" style={styles.label}>Full Name</label>
                                <input type="text" id="name" name="name" style={styles.input} required
                                    onFocus={handleFocus} onBlur={handleBlur} />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="email" style={styles.label}>Email Address</label>
                                <input type="email" id="email" name="email" style={styles.input} required
                                    onFocus={handleFocus} onBlur={handleBlur} />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="message" style={styles.label}>Message</label>
                                <textarea id="message" name="message" style={styles.textarea} required
                                    onFocus={handleFocus} onBlur={handleBlur}></textarea>
                            </div>

                            <button type="submit" style={styles.button}
                                onMouseEnter={handleButtonEnter}
                                onMouseLeave={handleButtonLeave}>
                                Submit Form <FiChevronsRight />
                            </button>
                        </form>

                        {result && (
                            <p style={{
                                ...styles.resultSpan,
                                color: result.includes("Successfully") ? '#28a745' : '#e53e3e'
                            }}>
                                {result}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactPage;
