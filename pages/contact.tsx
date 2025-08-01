import React from 'react';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { useForm, Form, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '../components/Form';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/Select';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import styles from './contact.module.css';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultFormValues: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
};

const services = [
  'AI Powered Chatbot',
  'Voice Agent Development',
  'Interview Copilot',
  'Sentiment Analysis',
  'Computer Vision',
  'Other',
];

const contactDetails = [
  {
    icon: <Mail size={22} className={styles.detailIcon} />,
    title: 'Email Us',
    content: 'info@krishvatech.com',
    description: 'For project inquiries and partnerships.',
  },
  {
    icon: <Phone size={22} className={styles.detailIcon} />,
    title: 'Call Us',
    content: '+91 97266 40019',
    description: 'Mon-Fri, 9am-6pm IST.',
  },
  {
    icon: <MapPin size={22} className={styles.detailIcon} />,
    title: 'Our Office',
    content: 'Surat, Gujarat, India',
    description: 'Serving clients globally from our hub.',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm({
    schema: contactFormSchema,
    defaultValues: defaultFormValues,
  });

  const onSubmit = (values: ContactFormValues) => {
    setIsSubmitting(true);
    console.log('Form submitted:', values);
    // TODO: Implement actual form submission logic (e.g., API call to an endpoint)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      form.setValues(defaultFormValues);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | KRISHVATECH PRIVATE LIMITED</title>
        <meta
          name="description"
          content="Get in touch with KRISHVATECH for AI-powered solutions. Contact us for project discussions, sales inquiries, or to learn more about our services."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.heroBreadcrumb}>Contact Us</p>
            <h1 className={styles.heroTitle}>Let's Build the Future, Together</h1>
            <p className={styles.heroSubtitle}>
              Whether you have a question about our services, a project proposal, or just want to learn more about what we do, we're ready to answer all your inquiries.
            </p>
          </div>
        </section>

        <main className={styles.mainContent}>
          <div className={styles.contactInfo}>
            <h2 className={styles.infoTitle}>Contact Information</h2>
            <p className={styles.infoSubtitle}>
              Reach out to us through any of the channels below. We look forward to hearing from you.
            </p>
            <div className={styles.detailsGrid}>
              {contactDetails.map((detail) => (
                <div key={detail.title} className={styles.detailCard}>
                  <div className={styles.detailIconWrapper}>{detail.icon}</div>
                  <div>
                    <h3 className={styles.detailTitle}>{detail.title}</h3>
                    <p className={styles.detailContent}>{detail.content}</p>
                    <p className={styles.detailDescription}>{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formContainer}>
            {isSubmitted ? (
              <div className={styles.successMessage}>
                <h3>Thank you for your message!</h3>
                <p>We've received your inquiry and will get back to you shortly.</p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                  <h2 className={styles.formTitle}>Send Us a Message</h2>
                  <div className={styles.formGrid}>
                    <FormItem name="name" className={styles.gridSpan2}>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          value={form.values.name}
                          onChange={(e) => form.setValues((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem name="email" className={styles.gridSpan2}>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          value={form.values.email}
                          onChange={(e) => form.setValues((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem name="company">
                      <FormLabel>Company Name (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Company Inc."
                          value={form.values.company}
                          onChange={(e) => form.setValues((prev) => ({ ...prev, company: e.target.value }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem name="service">
                      <FormLabel>Service of Interest</FormLabel>
                      <Select
                        onValueChange={(value) => form.setValues((prev) => ({ ...prev, service: value }))}
                        value={form.values.service}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>

                    <FormItem name="message" className={styles.gridSpan2}>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project or inquiry..."
                          rows={6}
                          value={form.values.message}
                          onChange={(e) => form.setValues((prev) => ({ ...prev, message: e.target.value }))}
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide as much detail as possible.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className={styles.submitButton}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send size={18} />}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </main>
      </div>
    </>
  );
}