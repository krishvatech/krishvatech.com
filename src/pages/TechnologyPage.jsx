import React from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Network, Server } from "lucide-react";
import {
  gpuVsCpuExecutionTable,
  inceptionStatement,
  nvidiaStack,
  technologyTopics,
} from "../content/platformData";
import EdgeVisionVerticalPipeline from "../components/pipeline/EdgeVisionVerticalPipeline";
import RuntimeStatusBar from "../components/RuntimeStatusBar";
import { Container, fadeInUp, revealTransition, SectionTitle } from "../components/layout";
import { PageHero } from "../components/PageHero";

const technologyPipelineStages = [
  "Camera Streams",
  "RTSP Ingestion",
  "Jetson Edge AI Node",
  "DeepStream Pipeline",
  "TensorRT GPU Inference",
  "Edge Event Engine",
  "Operations Dashboard",
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="Engineering Stack for Real-Time Edge AI Infrastructure"
        subtitle="Deep technical architecture for RTSP ingestion, DeepStream processing, TensorRT optimization, and fleet-scale edge deployment."
        actions={
          <>
            <a href="#architecture" className="btn-primary">View Runtime Architecture</a>
            <a href="/platform" className="btn-secondary">Back to Platform</a>
          </>
        }
      />

      <section className="section-shell" id="stack">
        <Container>
          <SectionTitle
            eyebrow="NVIDIA Aligned Stack"
            title="Accelerated Computing Foundation"
            subtitle="KrishvaTech engineering is aligned to GPU-native runtime principles for industrial computer vision."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {nvidiaStack.map((item, index) => (
              <motion.article
                key={item}
                className="panel"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ ...revealTransition, delay: index * 0.03 }}
              >
                <div className="tech-row"><Cpu size={16} /> {item}</div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell section-muted" id="architecture">
        <Container>
          <SectionTitle
            eyebrow="Runtime Diagram"
            title="Edge Inference Architecture"
            subtitle="Connected node diagram with data flow from camera ingestion to cloud control-plane observability."
          />
          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <EdgeVisionVerticalPipeline stages={technologyPipelineStages} />
            <RuntimeStatusBar className="mt-4" />
            <pre className="code-block runtime-sequence-block mt-4"><code>{`# EdgeVision runtime sequence\ncamera_streams -> rtsp_ingest -> jetson_node\n-> deepstream_multi_stream -> tensorrt_infer\n-> edge_event_engine -> operations_dashboard`}</code></pre>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell" id="gpu-vs-cpu">
        <Container>
          <SectionTitle
            eyebrow="Execution Model"
            title="What Runs on GPU vs CPU"
            subtitle="EdgeVision separates GPU inference workloads from CPU control-plane responsibilities for stable industrial operations."
          />
          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <div className="tech-table-shell">
              <table className="tech-table">
                <thead>
                  <tr>
                    <th>Pipeline Stage</th>
                    <th>GPU Runtime</th>
                    <th>CPU Runtime</th>
                    <th>Why This Split Matters</th>
                  </tr>
                </thead>
                <tbody>
                  {gpuVsCpuExecutionTable.map((row) => (
                    <tr key={row.stage}>
                      <td>{row.stage}</td>
                      <td>{row.gpuWorkload}</td>
                      <td>{row.cpuWorkload}</td>
                      <td>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell" id="deep-technical">
        <Container>
          <SectionTitle
            eyebrow="Deep Technical"
            title="Engineering Notes"
            subtitle="Reference-level implementation details for infrastructure reviewers and engineering teams."
          />

          <div className="mt-9 grid gap-5 xl:grid-cols-2">
            {technologyTopics.map((topic, index) => (
              <motion.article
                key={topic.title}
                className="panel"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ ...revealTransition, delay: index * 0.02 }}
              >
                <h3 className="text-xl text-white">{topic.title}</h3>
                <p className="mt-2 text-sm text-white/72">{topic.detail}</p>
                <pre className="code-block mt-4"><code>{topic.code}</code></pre>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell section-muted" id="infrastructure-note">
        <Container>
          <SectionTitle
            eyebrow="Program Alignment"
            title="NVIDIA Ecosystem Direction"
            subtitle="Current status statement for reviewers and stakeholders."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="panel lg:col-span-2">
              <p className="nvidia-note">{inceptionStatement}</p>
            </article>
            <article className="panel">
              <div className="architecture-row"><Server size={16} /> Edge-native runtime reliability</div>
              <div className="architecture-row mt-3"><Network size={16} /> Multi-site observability controls</div>
              <div className="architecture-row mt-3"><Database size={16} /> Industrial incident timeline data</div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
