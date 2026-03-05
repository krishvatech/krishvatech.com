import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { contactChannels } from "../content/platformData";
import { Container, fadeInUp, revealTransition, SectionTitle } from "../components/layout";
import { PageHero } from "../components/PageHero";

const channelIcons = [Mail, PhoneCall, MapPin];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Discuss an EdgeVision Deployment"
        subtitle="Share your camera footprint, industrial constraints, and operational goals to scope a GPU-accelerated deployment strategy."
        actions={
          <>
            <a href="mailto:info@krishvatech.com" className="btn-primary">Email KrishvaTech</a>
            <a href="/platform" className="btn-secondary">Review Platform</a>
          </>
        }
      />

      <section className="section-shell" id="contact-channels">
        <Container>
          <SectionTitle
            eyebrow="Enterprise Engagement"
            title="Connect with the KrishvaTech Team"
            subtitle="For pilot design, production rollout planning, and GPU infrastructure consultations."
          />

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {contactChannels.map((channel, index) => {
              const Icon = channelIcons[index % channelIcons.length];
              return (
                <motion.article
                  key={channel.label}
                  className="panel"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ ...revealTransition, delay: index * 0.06 }}
                >
                  {channel.href === "#" ? (
                    <div className="contact-item">
                      <Icon size={18} />
                      <div>
                        <p className="contact-label">{channel.label}</p>
                        <p className="contact-value">{channel.value}</p>
                      </div>
                    </div>
                  ) : (
                    <a className="contact-item" href={channel.href}>
                      <Icon size={18} />
                      <div>
                        <p className="contact-label">{channel.label}</p>
                        <p className="contact-value">{channel.value}</p>
                      </div>
                    </a>
                  )}
                </motion.article>
              );
            })}
          </div>

          <motion.article
            className="panel mt-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <p className="panel-title">Engagement Scope</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="tech-row">Industrial monitoring architecture workshops</div>
              <div className="tech-row">Pilot-to-production deployment planning</div>
              <div className="tech-row">GPU capacity and camera fleet sizing</div>
              <div className="tech-row">Edge-to-cloud observability blueprint</div>
            </div>
          </motion.article>
        </Container>
      </section>
    </>
  );
}
