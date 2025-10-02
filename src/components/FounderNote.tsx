'use client';
import React from 'react';
import { Flex, Heading, Text, Button, Tag } from '@/once-ui/components';
import styles from './FounderNote.module.scss';

export default function FounderNote() {
  return (
    <Flex
      fillWidth
      direction="column"
      alignItems="center"
      paddingY="xl"
      paddingX="l"
      className={styles.founderNoteContainer}
    >
      <Flex
        fillWidth
        maxWidth="m"
        direction="column"
        gap="l"
        alignItems="center"
        style={{ width: '100%', maxWidth: '100%' }}
      >
        {/* Header */}
        <Flex direction="column" alignItems="center" gap="m">
          <Heading
            variant="display-strong-s"
            wrap="balance"
            textAlign="center"
            style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            Founder's Note
          </Heading>
          <Text
            variant="body-default-l"
            textAlign="center"
            wrap="balance"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            A message from Shiva Karan, Founder of STED Studio
          </Text>
        </Flex>

        {/* Main Content */}
        <Flex
          direction="column"
          gap="l"
          padding="l"
          className={styles.contentCard}
        >
          {/* Introduction */}
          <Flex direction="column" gap="m">
            <Text variant="body-default-l" wrap="balance">
              <strong className={styles.brandName}>STED Space + STED Studio</strong> — Makers Space + Venture Studio from Vizag
            </Text>
            <Text variant="body-default-m" wrap="balance">
              Studio.sted.space By Shiva Karan S/O Naresh Kumar & Kameshwari Devi
            </Text>
            <Text variant="body-default-m" wrap="balance">
              <strong className={styles.brandName}>STED Studio</strong> is a <strong>builder-led venture studio</strong> from Vizag. We turn messy, meaningful problems into shipped products and durable ventures across various domains and industries from <strong>Food & Agri, Deep Tech, AI, Web3 & Cryptocurrencies, Sustainable development, & Education</strong> and many more.
            </Text>
            <Text variant="body-default-m" wrap="balance">
              Our model blends studio rigor with on-ground execution: we <strong className={styles.brandName}>decrypt</strong>, <strong className={styles.brandName}>design</strong>, <strong className={styles.brandName}>build</strong>, <strong className={styles.brandName}>launch</strong>, and <strong className={styles.brandName}>scale</strong>—then compound value through <strong className={styles.brandName}>community</strong>, <strong className={styles.brandName}>distribution</strong>, and <strong className={styles.brandName}>capital alignment</strong>.
            </Text>
          </Flex>

          {/* What we do */}
          <Flex direction="column" gap="m">
            <Heading variant="heading-strong-s" style={{ color: '#ffffff' }}>What we do</Heading>
            <Text variant="body-default-m" wrap="balance">
              We partner with founders, institutions, and ecosystems to go from zero to one and beyond:
            </Text>
            <Flex direction="column" gap="s">
              <Text variant="body-default-m">
                <strong>Design:</strong> Venture thesis, brand systems, product strategy, user research, and rapid prototyping.
              </Text>
              <Text variant="body-default-m">
                <strong>Build:</strong> Web/mobile apps, AI agents & automation, data pipelines, token rails, and real-world tech pilots. Your goto chance to go fully Agentic AI.
              </Text>
              <Text variant="body-default-m">
                <strong>Grow:</strong> Positioning, funnels, performance/organic channels, partnerships, analytics, and ops playbooks.
              </Text>
              <Text variant="body-default-m">
                <strong>Scale:</strong> Governance, tokenomics, financing toolkits, compliance pathways, and market expansion.
              </Text>
            </Flex>
          </Flex>

          {/* Signature products */}
          <Flex direction="column" gap="m">
            <Heading variant="heading-strong-s" style={{ color: '#ffffff' }}>Signature products</Heading>
            <Flex direction="column" gap="s">
              <Text variant="body-default-m">
                <strong>STED Sprints (3-4 weeks):</strong> Hypothesis → clickable prototype → user tests → MVP plan with budget, backlog, and success metrics.
              </Text>
              <Text variant="body-default-m">
                <strong>Launch Stack:</strong> Brand kit + landing/app + payments (Razorpay/UPI) + analytics + CRM — production-ready.
              </Text>
              <Text variant="body-default-m">
                <strong>AI Agent Pack:</strong> RAG copilots, workflow automations (n8n/Make), and data ops with guardrails.
              </Text>
              <Text variant="body-default-m">
                <strong>Tokenization Lab:</strong> RWA/NFT design, tokenomics, treasury patterns, and compliant go-to-market paths.
              </Text>
              <Text variant="body-default-m">
                <strong>Maker Program in a Box:</strong> Curriculum, workshop kits, and community ops for campuses/cities for STEM education.
              </Text>
              <Text variant="body-default-m">
                <strong>Impact Blueprint:</strong> Waste/water/energy baselines, KPIs, dashboards, and reporting.
              </Text>
            </Flex>
          </Flex>

          {/* Where we've applied this */}
          <Flex direction="column" gap="m">
            <Heading variant="heading-strong-s" style={{ color: '#ffffff' }}>Where we've applied this</Heading>
            <Text variant="body-default-m" wrap="balance">
              Selected initiatives span digital and real-world stacks:
            </Text>
            <Flex direction="column" gap="s">
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Sted Space:</strong> maker space n maker community of Vizag. <a href="https://sted.space" target="_blank" rel="noopener noreferrer">https://sted.space</a>
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Enhance42:</strong> Training pipelines across Top colleges of Vizag and Hiring funnels across Top 42 colleges of Andhra and Telangana. We currently hire for top AI startups across India.
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>ViolaNow.xyz:</strong> Brand → app → ops dashboards → payments for local services. Vizag based delivery app for laundry.
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Rythu Mowa / Good Food Co:</strong> Natural foods brand and distribution pilots. Connecting 200+ farmers around vizag to users.
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Yomm, Kumbhverse & Mahadev DAO:</strong> Culture-tech + spiritual learning experiences with token models. Explore Vedas and Sanatana Dharma while playing a game. Building spiritual backbone of Bharat with Naga saadhus and sidha yogis of India. <a href="https://yomm-xyz-plum.vercel.app" target="_blank" rel="noopener noreferrer">yomm-xyz-plum.vercel.app</a>
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Add-On Properties (AOP):</strong> Sustainable real-estate company, properties markets and material markets. <a href="https://addonprop.xyz" target="_blank" rel="noopener noreferrer">Addonprop.xyz</a> <a href="https://www.powersols.in" target="_blank" rel="noopener noreferrer">www.powersols.in</a>
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Smacoteq.com:</strong> Global Maritime Tradefinancing protocol and Neobank for MSMEs.
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Vortan.ai:</strong> AI for stocks trading and portfolio Intelligence based out of Silicon Valley. SF.
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Yuvathonofficial.com:</strong> Disaster relief and community welfare platform by Samarthya Foundation. Organizing Kullu Dussehra relief campaigns, blood donation drives, and cultural events to support flood-affected families in Himachal Pradesh.
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Startupweekend.in:</strong> India's premier startup ecosystem platform organizing hackathons, pitch competitions, and networking events. Fostering innovation and entrepreneurship across the country.
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Dpslec.com:</strong> Digital learning and community platform offering educational resources, skill development courses, and student support services. Focused on empowering learners with quality education and career development opportunities.
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Studentchakra.com:</strong> Student community platform connecting learners, sharing resources, and facilitating peer-to-peer learning. Building a collaborative ecosystem for student success.
              </Text>
              <Text variant="body-default-m">
                <strong className={styles.brandName}>Hackathon.studentchakra.com:</strong> Dedicated hackathon platform hosting coding competitions and innovation challenges for students. Encouraging technical creativity and problem-solving skills.
              </Text>
            </Flex>
          </Flex>

          {/* Why STED */}
          <Flex direction="column" gap="m">
            <Heading variant="heading-strong-s" style={{ color: '#ffffff' }}>Why STED</Heading>
            <Text variant="body-default-m" wrap="balance">
              <strong>Builder DNA:</strong> We ship. Fast prototypes, weekly demos, measurable outcomes.
            </Text>
            <Text variant="body-default-m" wrap="balance">
              <strong>End-to-end capability:</strong> Design → engineering → growth → capital → governance under one roof.
            </Text>
            <Text variant="body-default-m" wrap="balance">
              <strong>India-first, globally networked:</strong> Ground truth from Vizag; patterns portable to emerging markets.
            </Text>
            <Text variant="body-default-m" wrap="balance">
              <strong>Community distribution:</strong> Students, makers, and partners as a living go-to-market engine.
            </Text>
            <Text variant="body-default-m" wrap="balance">
              <strong>Aligned economics:</strong> Studio partnerships (equity + fee), JVs, or fixed-scope pods—skin in the game when it matters.
            </Text>
          </Flex>

          {/* How we engage */}
          <Flex direction="column" gap="m">
            <Heading variant="heading-strong-s" style={{ color: '#ffffff' }}>How we engage</Heading>
            <Flex direction="column" gap="s">
              <Text variant="body-default-m">
                <strong>Studio Partnership:</strong> Co-create new ventures with shared upside.
              </Text>
              <Text variant="body-default-m">
                <strong>Co-Build JV:</strong> Shared IP/revenue with milestone gates.
              </Text>
              <Text variant="body-default-m">
                <strong>Service Pods:</strong> Fixed-scope, time-boxed builds when speed and clarity are paramount.
              </Text>
              <Text variant="body-default-m">
                <strong>Retainers:</strong> Ongoing growth, data, and ops enablement.
              </Text>
            </Flex>
          </Flex>

          {/* The ask */}
          <Flex direction="column" gap="m">
            <Heading variant="heading-strong-s" style={{ color: '#ffffff' }}>The ask</Heading>
            <Text variant="body-default-m" wrap="balance">
              If you're a founder, institution, or ecosystem steward with a high-leverage problem—digital or real-world—we'll scope a STED Sprint to prove traction quickly, then scale with the right mix of product, community, and capital. Let's build something that lasts.
            </Text>
            <Text variant="body-default-m" wrap="balance">
              If you're already up and running with your venture and need assistance in terms of Rebranding to modern market standards, or improve existing user experiences, improve marketing systems or to scale to new markets talk to us.
            </Text>
          </Flex>

          {/* Contact CTA */}
          <Flex
            direction="column"
            alignItems="center"
            gap="m"
            padding="l"
            className={styles.contactCard}
          >
            <Text variant="heading-strong-s" textAlign="center" style={{ color: '#ffffff' }}>
              Ready to build something that lasts?
            </Text>
            <Button
              href="https://wa.me/7382047877"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="l"
              style={{ 
                color: '#1a1a2e',
                background: 'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)',
                border: '1px solid rgba(96, 165, 250, 0.5)',
                boxShadow: '0 4px 12px rgba(96, 165, 250, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <span style={{ color: '#1a1a2e', textShadow: 'none' }}>
                WhatsApp +91 7382047877
              </span>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
