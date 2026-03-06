export const inceptionStatement =
  "KrishvaTech is preparing its application to the NVIDIA Inception program to further scale its GPU-powered industrial AI platform.";

export const infrastructurePositioningSentence =
  "KrishvaTech is building GPU-accelerated edge AI infrastructure that powers industrial multi-stream inference pipelines and converts runtime signals into real-time operational intelligence.";

export const homeHeroBullets = [
  "Multi-stream inference pipeline designed for industrial camera environments.",
  "Edge Event Engine designed to convert video signals into operational events.",
  "Operations Dashboard planned for incident review, alert workflows, and fleet visibility.",
];

const textileIndustryImage =
  "https://images.unsplash.com/photo-1758270804188-8ca0b6d254bc?auto=format&fit=crop&w=2000&q=80";
const diamondIndustryImage =
  "https://images.pexels.com/photos/6263066/pexels-photo-6263066.jpeg?auto=compress&cs=tinysrgb&w=2000";
const smartInfrastructureImage =
  "https://images.pexels.com/photos/30546987/pexels-photo-30546987.jpeg?auto=compress&cs=tinysrgb&w=2000";

export const aiUseCaseMap = [
  {
    title: "Textile Manufacturing Intelligence",
    summary: "AI monitoring for high-throughput production environments.",
    image: textileIndustryImage,
    useCases: [
      {
        title: "Production Floor Monitoring",
        description:
          "Detect machine downtime, workflow bottlenecks, and irregular production patterns.",
        tooltip:
          "Real-time video analytics detects workflow disruptions and machine downtime using GPU accelerated inference pipelines.",
      },
      {
        title: "Worker Safety Monitoring",
        description:
          "Identify unsafe proximity to machines and safety compliance issues.",
        tooltip:
          "EdgeVision applies low-latency event rules on Jetson nodes to flag unsafe worker-machine interactions in real time.",
      },
      {
        title: "Process Anomaly Detection",
        description:
          "Detect unusual events in weaving, spinning, and packaging lines.",
        tooltip:
          "DeepStream multi-stream analysis identifies process deviations across parallel textile lines before they impact output.",
      },
      {
        title: "Machine Utilization Insights",
        description:
          "Analyze equipment activity patterns across production floors.",
        tooltip:
          "Edge-to-cloud telemetry converts video events into utilization metrics for capacity planning and throughput optimization.",
      },
    ],
  },
  {
    title: "Diamond Processing Intelligence",
    summary: "Visual intelligence for precision and high-value operations.",
    image: diamondIndustryImage,
    useCases: [
      {
        title: "Polishing Process Monitoring",
        description:
          "Track polishing workstation activity and workflow efficiency.",
        tooltip:
          "GPU-accelerated pipelines monitor polishing cycles and workstation throughput with consistent frame-level analysis.",
      },
      {
        title: "Asset Protection Monitoring",
        description:
          "Detect restricted zone entry or unusual handling of high-value assets.",
        tooltip:
          "Rule-driven anomaly detection flags unauthorized access patterns and unusual handling behaviors in sensitive areas.",
      },
      {
        title: "Operational Workflow Visibility",
        description:
          "Monitor production stages and workstation occupancy.",
        tooltip:
          "EdgeVision correlates multi-camera streams to provide live occupancy and stage-level workflow visibility for supervisors.",
      },
      {
        title: "Security Analytics",
        description:
          "Continuous visual intelligence for high-value production environments.",
        tooltip:
          "Always-on inference with event prioritization supports rapid security response in high-value manufacturing zones.",
      },
    ],
  },
  {
    title: "Urban Infrastructure Intelligence",
    summary: "Operational intelligence for city-scale monitored environments.",
    image: smartInfrastructureImage,
    useCases: [
      {
        title: "Public Safety Monitoring",
        description:
          "Detect abnormal events across public spaces and transport hubs.",
        tooltip:
          "Multi-stream anomaly models detect unusual events and send prioritized safety alerts to operations teams.",
      },
      {
        title: "Traffic Flow Monitoring",
        description:
          "Analyze real-time traffic patterns at major intersections.",
        tooltip:
          "DeepStream pipelines aggregate intersection feeds into live traffic insights for congestion and incident response.",
      },
      {
        title: "Critical Infrastructure Surveillance",
        description:
          "Monitor power facilities, logistics hubs, and city infrastructure.",
        tooltip:
          "Edge-native deployment supports resilient monitoring for distributed critical infrastructure with low network dependency.",
      },
      {
        title: "Anomaly Detection in Public Zones",
        description:
          "Identify unusual behavior patterns in monitored environments.",
        tooltip:
          "TensorRT-optimized inference maintains high-throughput anomaly detection across dense public camera networks.",
      },
    ],
  },
];

export const useCaseMapPipeline = [
  "Camera Streams",
  "RTSP Ingestion",
  "Jetson Edge AI Node",
  "DeepStream Pipeline",
  "TensorRT Inference",
  "Edge Event Engine",
  "Operations Dashboard",
];

export const architecturePreviewSteps = [
  "Camera Streams",
  "RTSP Ingestion",
  "Jetson Edge AI Node",
  "DeepStream Multi-Stream Pipeline",
  "TensorRT GPU Inference",
  "Edge Event Engine",
  "Operations Dashboard",
];

export const nvidiaStack = [
  "NVIDIA Jetson",
  "DeepStream SDK",
  "TensorRT",
  "CUDA",
  "cuDNN",
  "Triton Inference Server",
];

export const platformCapabilities = [
  {
    title: "RTSP Multi-Camera Ingestion",
    detail:
      "Industrial-grade onboarding, health monitoring, and synchronization across high-density camera fleets.",
  },
  {
    title: "DeepStream Multi-Stream Pipelines",
    detail:
      "GPU-aware stream muxing and batched execution to maintain real-time throughput at the edge.",
  },
  {
    title: "TensorRT Optimized Inference",
    detail:
      "INT8/FP16 inference paths tuned for deterministic latency on NVIDIA Jetson edge devices.",
  },
  {
    title: "Industrial Anomaly Detection",
    detail:
      "Contextual event logic for production anomalies, worker safety risk signals, and asset protection workflows.",
  },
  {
    title: "Edge-to-Cloud Architecture",
    detail:
      "Secure event routing and telemetry pipelines from edge nodes to cloud dashboards and command layers.",
  },
  {
    title: "Scalable Camera Fleets",
    detail:
      "Operational templates for scaling from pilot sites to multi-facility deployments with centralized observability.",
  },
];

export const homepageIndustrialFocus = [
  {
    title: "Textile Manufacturing",
    summary:
      "Production-floor defect monitoring, worker safety compliance, and machine oversight with real-time alerts.",
    points: ["Defect monitoring", "Worker safety monitoring", "Machine oversight"],
    image: textileIndustryImage,
  },
  {
    title: "Diamond Processing",
    summary:
      "Polishing-line visibility and asset protection analytics for high-value operations and controlled workflows.",
    points: ["Polishing monitoring", "Asset protection", "Security analytics"],
    image: diamondIndustryImage,
  },
  {
    title: "Smart Infrastructure",
    summary:
      "City surveillance analytics, anomaly detection, and operational safety intelligence for public infrastructure.",
    points: ["City surveillance analytics", "Anomaly detection", "Operational safety"],
    image: smartInfrastructureImage,
  },
];

export const gpuAdvantagePoints = [
  "Traditional CPU-based video pipelines struggle to sustain multiple high-resolution camera streams in real time.",
  "EdgeVision uses GPU-accelerated pipelines to execute multi-stream inference in parallel across industrial camera networks.",
  "NVIDIA Jetson edge nodes with DeepStream keep decode, preprocess, and inference workloads on the GPU near the camera source.",
  "TensorRT optimization delivers high-throughput inference with lower latency for operational event detection.",
  "Industrial sites can run real-time video intelligence at the edge without continuously sending raw video to the cloud.",
];

export const gpuAccelerationStory = [
  {
    title: "CPU Bottleneck in Multi-Camera Workloads",
    detail:
      "Traditional CPU-only video analytics pipelines cannot reliably process high-density camera fleets at production latency targets.",
  },
  {
    title: "Parallel GPU-Accelerated Pipelines",
    detail:
      "EdgeVision runs DeepStream multi-stream pipelines on NVIDIA Jetson to process concurrent RTSP streams in parallel.",
  },
  {
    title: "Low-Latency Edge-Native Inference",
    detail:
      "By keeping inference on edge GPUs, the platform reduces round-trip delay and supports immediate operational response.",
  },
  {
    title: "TensorRT Throughput Optimization",
    detail:
      "TensorRT-optimized models improve runtime efficiency, enabling higher stream density per node with deterministic latency.",
  },
  {
    title: "Scalable Industrial Infrastructure",
    detail:
      "GPU-native architecture scales from pilot deployments to multi-site industrial monitoring without depending on raw-video cloud transfer.",
  },
];

export const gpuAccelerationSummary =
  "EdgeVision assigns compute-intensive decode, preprocessing, and inference stages to GPUs so industrial teams can operate real-time video intelligence infrastructure at deployment scale.";

export const platformSectionCopy = {
  architectureBuilt: {
    headline: "Designed for Edge-First Industrial Environments",
    lines: [
      "EdgeVision is designed to run close to cameras, where latency and uptime matter.",
      "The platform architecture separates inference, event processing, and control-plane functions.",
      "This structure is intended to support staged rollout from pilot zones to larger camera footprints.",
    ],
    bullets: [
      "RTSP ingestion layer for camera onboarding and stream control.",
      "Jetson-based edge nodes for local GPU inference.",
      "Edge-to-dashboard event flow for operations teams.",
    ],
  },
  whyGpuRequired: {
    headline: "Why GPU Acceleration Is Required",
    lines: [
      "CPU-only pipelines are typically constrained when multiple high-resolution streams must be processed in parallel.",
      "EdgeVision is designed to use GPU-accelerated decode, preprocessing, and inference paths.",
      "TensorRT optimization is planned to reduce inference latency variance under multi-stream load.",
    ],
    bullets: [
      "Parallel stream processing with DeepStream pipeline orchestration.",
      "Model runtime optimization with TensorRT on Jetson hardware.",
      "Lower edge-to-alert delay target through on-device inference.",
    ],
  },
  deploymentFirst: {
    headline: "Deployment-First Architecture",
    lines: [
      "The platform is being built for real operational constraints: unstable streams, intermittent networks, and long-running edge services.",
      "Design focus is on predictable behavior, controlled rollout, and maintainable operations.",
      "Configuration and telemetry are intended to support site-by-site expansion.",
    ],
    bullets: [
      "Policy-driven onboarding for new cameras and zones.",
      "Event schema normalization for downstream operational systems.",
      "Planned controls for update, rollback, and node health visibility.",
    ],
  },
  realTimePipeline: {
    headline: "Real-Time EdgeVision Pipeline",
    lines: [
      "Camera Streams -> RTSP Ingestion -> Jetson Edge AI Node -> DeepStream Multi-Stream Pipeline -> TensorRT Optimized Inference -> Edge Event Engine -> Operations Dashboard.",
      "Each stage has a defined role to keep compute-heavy tasks on GPU and control tasks on CPU.",
      "This pipeline is designed for low-latency event generation in industrial monitoring workflows.",
    ],
    bullets: [
      "GPU path: decode, preprocessing, inference.",
      "CPU path: event rules, routing, and control-plane logic.",
      "Dashboard path: event timelines, alert states, and operational context.",
    ],
  },
};

export const productStatusContent = {
  statusLabel: "Private Beta",
  availableNow: [
    "Core architecture definition and platform UI flows.",
    "RTSP ingestion and multi-stream pipeline integration in beta scope.",
    "Jetson + DeepStream + TensorRT runtime integration in active development.",
  ],
  comingNext: [
    "Expanded event rule packs for target industries.",
    "Operations dashboard workflows and role-based access controls.",
    "Reliability hardening for long-duration edge runtime behavior.",
  ],
  access:
    "Contact Us to request pilot or beta access. Share target environment details (camera count, site type, and detection priorities) to scope onboarding.",
};

export const gpuVsCpuExecutionTable = [
  {
    stage: "RTSP decode and frame preprocessing",
    gpuWorkload: "NVDEC decode, color conversion, resize, normalization on GPU buffers.",
    cpuWorkload: "Stream health checks, session orchestration, retry control.",
    reason:
      "GPU offload removes CPU bottlenecks and keeps frame pipelines stable under multi-camera load.",
  },
  {
    stage: "Multi-stream pipeline execution",
    gpuWorkload: "DeepStream batched pipeline execution across concurrent streams.",
    cpuWorkload: "Pipeline configuration, control-plane scheduling, telemetry hooks.",
    reason:
      "GPU parallelism sustains higher stream density with deterministic throughput.",
  },
  {
    stage: "Model inference",
    gpuWorkload: "TensorRT FP16/INT8 optimized inference kernels.",
    cpuWorkload: "Model lifecycle management and fallback orchestration.",
    reason:
      "GPU inference is designed for lower latency variation and better throughput per watt at the edge.",
  },
  {
    stage: "Event generation and routing",
    gpuWorkload: "Optional GPU analytics extensions and post-process operators.",
    cpuWorkload: "Edge Event Engine rule evaluation, deduplication, policy checks, API publishing.",
    reason:
      "CPU control logic turns GPU detections into operationally actionable events.",
  },
  {
    stage: "Operations dashboard delivery",
    gpuWorkload: "Not required for dashboard transport and storage.",
    cpuWorkload: "Event indexing, secure transport, dashboard query serving, audit logging.",
    reason:
      "Separation of concerns keeps GPU capacity focused on vision inference workloads.",
  },
];

export const reliabilityDesignGoalsContent = {
  intro: "These are active design goals for the beta platform, not production claims.",
  goals: [
    "Stream resiliency: reconnect handling, health checks, and degraded-mode stream behavior.",
    "Operational telemetry: node status, stream state, pipeline counters, and event flow monitoring.",
    "Watchdog controls: process supervision and recovery triggers for stuck or failed services.",
    "Restart policies: controlled automatic restart and staged recovery for edge runtime components.",
    "Auditability: event trail design for operator review and incident reconstruction.",
  ],
};

export const targetDeploymentProfiles = [
  {
    industry: "Textile Manufacturing",
    targetEnvironment: "Spinning, weaving, and packaging floors",
    typicalTargetRange: "28-64 cameras per site",
    plannedDetections: ["Machine downtime signals", "Worker safety zone breach", "Process anomaly patterns"],
  },
  {
    industry: "Diamond Processing",
    targetEnvironment: "Polishing and grading work zones",
    typicalTargetRange: "16-40 cameras per site",
    plannedDetections: ["Restricted zone entry", "Asset handling anomaly", "Workflow occupancy drift"],
  },
  {
    industry: "Smart Infrastructure",
    targetEnvironment: "Traffic corridors and public operations zones",
    typicalTargetRange: "40-120 cameras per site",
    plannedDetections: ["Public safety anomalies", "Traffic congestion spikes", "Perimeter security events"],
  },
];

export const edgeDeploymentPhilosophy = [
  "Low latency inference for operational decisions in seconds, not minutes.",
  "Real-time alerts for production risk, safety events, and security anomalies.",
  "On-premise processing to keep critical industrial video data local.",
  "Scalable camera fleets managed with centralized observability controls.",
];

export const deploymentWorkflow = [
  "Camera onboarding",
  "Edge inference",
  "Event detection",
  "Cloud dashboard integration",
];

export const platformSections = [
  {
    title: "Edge AI Deployment",
    detail:
      "Jetson edge nodes are deployed near camera clusters to execute accelerated inference and local event decisioning.",
  },
  {
    title: "Multi-Stream Video Analytics",
    detail:
      "DeepStream pipelines process multiple RTSP streams simultaneously using batched decode, preprocess, and inference flows.",
  },
  {
    title: "GPU Optimization",
    detail:
      "TensorRT model optimization with CUDA-accelerated kernels improves deterministic latency and sustained throughput.",
  },
];

export const technologyTopics = [
  {
    title: "RTSP Video Ingestion Pipelines",
    detail:
      "Stream adapters enforce validation, retry policies, and health telemetry for resilient long-running ingestion.",
    code: `rtsp_sources:\n  - id: CAM_TXT_01\n    uri: rtsp://edge-gateway/cam1\n    reconnect_policy: exponential_backoff\n    heartbeat_sec: 15\n    buffer_mode: bounded`,
  },
  {
    title: "Zero-Copy GPU Buffers",
    detail:
      "Frame transport uses zero-copy paths to minimize memory overhead and CPU bottlenecks across pipeline stages.",
    code: `decode -> nvbufsurface (GPU)\n        -> preprocess (GPU)\n        -> inference tensor (GPU)\n# no host copy in critical path`,
  },
  {
    title: "DeepStream Processing Stages",
    detail:
      "Pipeline staging includes decode, batch mux, preprocess, infer, track, rule-engine, and event publishing.",
    code: `uridecodebin -> nvstreammux -> nvinfer\n-> nvtracker -> nvdsanalytics\n-> event-router -> edge-event-engine`,
  },
  {
    title: "TensorRT Model Conversion Workflow",
    detail:
      "Model conversion and calibration workflow is versioned for repeatable deployment across Jetson hardware profiles.",
    code: `onnx_model -> trtexec --fp16 --workspace=4096\n-> calibrate(INT8) -> engine.plan\n-> signed release bundle`,
  },
  {
    title: "GPU Memory Optimization",
    detail:
      "Memory pools and stream scheduling are tuned to maximize occupancy and avoid fragmentation in persistent runtimes.",
    code: `batch_size=8\nworkspace_mb=4096\nmax_streams_per_node=24\nallocator=pooled\nlatency_target_ms=<120`,
  },
  {
    title: "Edge-to-Cloud Architecture",
    detail:
      "Edge Event Engine emits normalized events to cloud control planes for incident timelines, analytics, and fleet health.",
    code: `edge-event-engine -> secure-bus -> cloud-ingest\n-> incident-store -> operations-dashboard\n-> policy-sync -> edge-node`,
  },
  {
    title: "Fleet Scaling Strategy",
    detail:
      "Site templates and policy orchestration support staged rollout from pilot lines to multi-site operations.",
    code: `site_template apply --industry textile\nnode_autoregister --site SRT_12\npolicy_sync --all-nodes --region west-india`,
  },
];

export const industriesPageContent = [
  {
    title: "Textile Industry",
    intro: "AI monitoring for production floors where throughput and quality must remain predictable.",
    points: [
      "Production floor anomaly detection",
      "Worker safety monitoring near machine zones",
      "Machine oversight for downtime and bottleneck signals",
    ],
    image: textileIndustryImage,
  },
  {
    title: "Diamond Industry",
    intro: "High-value workflows requiring traceability, precision monitoring, and asset protection.",
    points: [
      "Polishing process monitoring",
      "Asset protection in restricted zones",
      "Security analytics for sensitive operations",
    ],
    image: diamondIndustryImage,
  },
  {
    title: "Smart Infrastructure",
    intro: "Operational intelligence for public infrastructure and critical surveillance environments.",
    points: [
      "City surveillance analytics",
      "Anomaly detection for public zones",
      "Operational safety event monitoring",
    ],
    image: smartInfrastructureImage,
  },
];

export const aboutPillars = [
  {
    title: "Why KrishvaTech Exists",
    detail:
      "To bridge the gap between industrial vision pilots and reliable GPU-powered production systems that operate continuously.",
  },
  {
    title: "Industrial AI Specialization",
    detail:
      "The company is focused on manufacturing, infrastructure, and safety-critical deployments with measurable operational outcomes.",
  },
  {
    title: "GPU-Native Engineering Mindset",
    detail:
      "Architecture decisions begin at the GPU runtime layer: throughput, memory stability, and deterministic latency under load.",
  },
  {
    title: "India Manufacturing Focus",
    detail:
      "Build and deploy edge-native AI infrastructure aligned with India’s manufacturing scale and operational realities.",
  },
];

export const contactChannels = [
  { label: "Email", value: "info@krishvatech.com", href: "mailto:info@krishvatech.com" },
  { label: "Phone", value: "+91 97266 40019", href: "tel:+919726640019" },
  { label: "Headquarters", value: "India - Industrial deployment operations", href: "#" },
];
