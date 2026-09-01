const KEY = "jobSwitchTracker.v3";
const DRIVE_NAME = "job-switch-tracker.json";
const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file";

const plan = [
  ["Python", "Python Fundamentals", 5],
  ["Python", "Data Structures", 5],
  ["Python", "Functions", 4],
  ["Python", "OOP", 5],
  ["Python", "Exceptions & Error Handling", 3],
  ["Python", "File & Data Handling", 3],
  ["Python", "Iterators & Generators", 4],
  ["Python", "Decorators", 3],
  ["Python", "Context Managers", 2],
  ["Python", "Typing, Dataclasses & Logging", 4],
  ["Python", "pytest & Testing", 4],
  ["DSA", "Arrays", 5],
  ["DSA", "Strings", 5],
  ["DSA", "HashMap & Set", 5],
  ["DSA", "Two Pointers", 4],
  ["DSA", "Sliding Window", 5],
  ["DSA", "Stack", 3],
  ["DSA", "Queue", 3],
  ["DSA", "Binary Search", 4],
  ["DSA", "Linked List", 4],
  ["Backend Engineering", "HTTP & REST", 4],
  ["Backend Engineering", "FastAPI Fundamentals", 7],
  ["Backend Engineering", "Pydantic & Validation", 4],
  ["Backend Engineering", "Dependency Injection & Middleware", 4],
  ["Backend Engineering", "Authentication & JWT", 6],
  ["Backend Engineering", "Authorization & RBAC", 4],
  ["Backend Engineering", "PostgreSQL Fundamentals", 7],
  ["Backend Engineering", "SQLAlchemy & Alembic", 6],
  ["Backend Engineering", "Redis & Caching", 4],
  ["Backend Engineering", "API Testing", 4],
  ["Full Stack", "React Fundamentals", 7],
  ["Full Stack", "Hooks, Forms & State", 6],
  ["Full Stack", "Next.js Fundamentals", 7],
  ["Full Stack", "API Integration & Auth UI", 5],
  ["Machine Learning", "NumPy", 4],
  ["Machine Learning", "Pandas", 5],
  ["Machine Learning", "EDA & Visualization", 5],
  ["Machine Learning", "Statistics", 7],
  ["Machine Learning", "Probability Basics", 4],
  ["Machine Learning", "Regression", 5],
  ["Machine Learning", "Classification", 6],
  ["Machine Learning", "Trees & Random Forest", 5],
  ["Machine Learning", "Boosting & XGBoost", 5],
  ["Machine Learning", "Preprocessing & Feature Engineering", 6],
  ["Machine Learning", "Model Evaluation", 6],
  ["Machine Learning", "Cross-validation & Tuning", 4],
  ["Machine Learning", "ML Deployment", 5],
  ["Deep Learning", "PyTorch Fundamentals", 6],
  ["Deep Learning", "Training Loops & Autograd", 6],
  ["Deep Learning", "Neural Networks", 5],
  ["Deep Learning", "CNN Basics", 4],
  ["Deep Learning", "Transformers", 8],
  ["Deep Learning", "Hugging Face", 5],
  ["Generative AI", "LLM Fundamentals", 5],
  ["Generative AI", "Prompt Engineering", 4],
  ["Generative AI", "Structured Outputs", 3],
  ["Generative AI", "Embeddings", 5],
  ["Generative AI", "Vector Databases", 5],
  ["Generative AI", "RAG Fundamentals", 7],
  ["Generative AI", "Advanced RAG", 7],
  ["Generative AI", "Tool Calling", 5],
  ["Generative AI", "Agents & LangGraph", 6],
  ["Generative AI", "LLM Evaluation", 5],
  ["Generative AI", "AI Security", 5],
  ["Artificial Intelligence", "AI Fundamentals", 4],
  ["Artificial Intelligence", "Machine Learning", 5],
  ["Artificial Intelligence", "Deep Learning", 6],
  ["Artificial Intelligence", "Transformers", 7],
  ["Artificial Intelligence", "Generative AI", 6],
  ["Artificial Intelligence", "Agents", 5],
  ["Artificial Intelligence", "AI Engineering", 5],
  ["Artificial Intelligence", "AI Security & Responsible AI", 5],
  ["Database Engineering", "Database Fundamentals", 4],
  ["Database Engineering", "SQL", 4],
  ["Database Engineering", "Database Design", 5],
  ["Database Engineering", "Indexing", 4],
  ["Database Engineering", "Transactions", 4],
  ["Database Engineering", "PostgreSQL", 5],
  ["Database Engineering", "NoSQL", 4],
  ["Database Engineering", "Database Interview Preparation", 4],
  ["Flagship Project", "Project Architecture & Requirements", 6],
  ["Flagship Project", "Authentication & Workspaces", 7],
  ["Flagship Project", "Document Upload & Object Storage", 7],
  ["Flagship Project", "Background Processing", 7],
  ["Flagship Project", "Document Extraction & Chunking", 7],
  ["Flagship Project", "Embeddings & Qdrant", 8],
  ["Flagship Project", "RAG & Citations", 8],
  ["Flagship Project", "Chat & Streaming", 7],
  ["Flagship Project", "Search & Conversation History", 5],
  ["Flagship Project", "Testing & Error Handling", 6],
  ["Flagship Project", "Security & Rate Limiting", 5],
  ["Flagship Project", "Frontend Polish", 6],
  ["Cloud / DevOps", "Docker Fundamentals", 5],
  ["Cloud / DevOps", "Docker Compose", 4],
  ["Cloud / DevOps", "AWS EC2", 4],
  ["Cloud / DevOps", "AWS S3 & RDS", 5],
  ["Cloud / DevOps", "IAM & CloudWatch", 4],
  ["Cloud / DevOps", "CI/CD with GitHub Actions", 5],
  ["System Design", "Requirements & Capacity", 4],
  ["System Design", "API Design", 4],
  ["System Design", "Database Design", 5],
  ["System Design", "Caching & Redis", 4],
  ["System Design", "Queues & Async Processing", 5],
  ["System Design", "Scalability & Load Balancing", 5],
  ["System Design", "Reliability & Observability", 5],
  ["System Design", "AI System Design", 7],
  ["System Design", "AI Security & Cost Optimization", 5],
  ["Interview Preparation", "Python Interview Revision", 6],
  ["Interview Preparation", "DSA Interview Practice", 10],
  ["Interview Preparation", "SQL & Backend Interviews", 6],
  ["Interview Preparation", "ML/AI Interview Revision", 8],
  ["Interview Preparation", "Project Story & Mock Interviews", 8],
];

const uid = () =>
  crypto.randomUUID
    ? crypto.randomUUID()
    : "t_" + Date.now() + "_" + Math.random().toString(36).slice(2);
const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const toDateKey = (d = new Date()) => iso(d);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
const pct = (n) => Math.max(0, Math.min(100, +n || 0));
const hrs = (n) => (+n || 0).toFixed(1).replace(".0", "") + "h";
const statusClass = (s) =>
  s === "Completed"
    ? "status-done"
    : s === "In Progress"
      ? "status-prog"
      : "status-not";
const revisionClass = (s) =>
  s === "Needs Revision"
    ? "status-warn"
    : s === "Reviewed"
      ? "status-done"
      : "status-not";
const normalizeConfidence = (v) =>
  ["Weak", "Needs Practice", "Good", "Strong"].includes(v) ? v : "Weak";

function createStarterState() {
  const topics = plan.map((item, idx) => ({
    id: uid(),
    course: item[0],
    name: item[1],
    expected: item[2],
    taken: 0,
    covered: 0,
    status: "Not Started",
    remarks: "",
    plannedDate: (() => {
      const d = new Date(2026, 8, 1);
      d.setDate(d.getDate() + Math.floor(idx / 2));
      return iso(d);
    })(),
    priority: "Normal",
  }));

  const projects = [
    {
      id: uid(),
      name: "AI Knowledge Platform",
      type: "Full-Stack AI",
      status: "In Progress",
      progress: 72,
      target: "Portfolio",
      priority: "High",
      description:
        "Build a full AI knowledge platform with RAG, search and dashboarding.",
      goal: "Create a production-style AI learning platform.",
      startDate: "2026-08-01",
      targetDate: "2026-12-15",
      repositoryLink: "",
      liveLink: "",
      documentationLink: "",
      designLink: "",
      notes: "Focus on retrieval quality and a clean UX.",
      technologies: [
        "Next.js",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "Qdrant",
        "RAG",
        "AWS",
      ],
      expectedHours: 120,
      takenHours: 74,
      tasks: [
        {
          id: uid(),
          title: "Project architecture",
          status: "Completed",
          priority: "High",
          estimatedHours: 8,
          actualHours: 8,
          remarks: "Approved",
        },
        {
          id: uid(),
          title: "Database schema",
          status: "Completed",
          priority: "High",
          estimatedHours: 10,
          actualHours: 9,
          remarks: "Core tables done",
        },
        {
          id: uid(),
          title: "Authentication",
          status: "Completed",
          priority: "High",
          estimatedHours: 8,
          actualHours: 7,
          remarks: "Working",
        },
        {
          id: uid(),
          title: "Embedding pipeline",
          status: "In Progress",
          priority: "High",
          estimatedHours: 16,
          actualHours: 10,
          remarks: "Chunking stage underway",
        },
        {
          id: uid(),
          title: "RAG evaluation",
          status: "To Do",
          priority: "High",
          estimatedHours: 14,
          actualHours: 0,
          remarks: "Need retrieval comparison",
        },
      ],
    },
  ];

  const revisionItems = [
    {
      id: uid(),
      course: "Python",
      topic: "Decorators",
      subtopic: "Decorators",
      status: "Needs Revision",
      confidence: "Weak",
      lastRevised: "",
      nextReview: "",
      revisionCount: 0,
      priority: "High",
      notes: "Need more practice with decorators and closures.",
    },
    {
      id: uid(),
      course: "Database Engineering",
      topic: "SQL",
      subtopic: "JOINs",
      status: "Needs Revision",
      confidence: "Needs Practice",
      lastRevised: "",
      nextReview: "",
      revisionCount: 1,
      priority: "High",
      notes: "Need more practice with LEFT JOIN vs INNER JOIN.",
    },
    {
      id: uid(),
      course: "Artificial Intelligence",
      topic: "Generative AI",
      subtopic: "RAG",
      status: "Needs Revision",
      confidence: "Good",
      lastRevised: "2026-08-30",
      nextReview: "2026-09-05",
      revisionCount: 2,
      priority: "Medium",
      notes: "Review retrieval and prompt evaluation flow.",
    },
  ];

  return {
    targetDate: "2027-02-28T23:59",
    dailyTarget: 2,
    settings: { clientId: "" },
    selected: topics[0]?.id || null,
    topics,
    revisionItems,
    projects,
    sessions: [],
    dailyLogs: [
      {
        id: uid(),
        date: toDateKey(),
        hours: 2.5,
        consistency: "Good",
        notes: "Completed SQL review and decorators notes.",
      },
    ],
  };
}

function readSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (!saved) return createStarterState();
    if (!saved.topics) saved.topics = createStarterState().topics;
    if (!saved.revisionItems) saved.revisionItems = [];
    if (!saved.projects) saved.projects = [];
    if (!saved.dailyLogs) saved.dailyLogs = [];
    if (!saved.sessions) saved.sessions = [];
    return saved;
  } catch {
    return createStarterState();
  }
}

let S = readSavedState();
let timer = { on: false, id: null, start: 0, handle: null };
let cal = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let driveToken = null;
let lastDriveSyncTime = 0;
let autoSyncEnabled = false;
let lastDriveLoadTime = 0;
let syncCheckInterval = null;

const $ = (id) => document.getElementById(id);

function save() {
  localStorage.setItem(KEY, JSON.stringify(S));
  const statusEl = $("saveState");
  if (statusEl)
    statusEl.textContent =
      "Saved locally • " +
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  renderAll();

  // Auto-sync to Drive if connected and enabled
  if (driveToken && autoSyncEnabled && Date.now() - lastDriveSyncTime > 5000) {
    lastDriveSyncTime = Date.now();
    driveSave().catch((e) => console.error("Auto-sync failed:", e));
  }
}

function toast(message) {
  const t = $("toast");
  if (!t) return;
  t.textContent = message;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

function currentTopic() {
  return (
    S.topics.find((t) => t.id === S.selected) ||
    S.topics.find((t) => t.status === "In Progress") ||
    S.topics.find((t) => t.status !== "Completed") ||
    S.topics[0]
  );
}

function getRevisionQueue() {
  return [...S.revisionItems]
    .filter((item) => item.status === "Needs Revision")
    .sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority !== "High" && b.priority === "High") return 1;
      return (a.topic || "").localeCompare(b.topic || "");
    });
}

function getTodayLog() {
  const key = toDateKey();
  return (
    S.dailyLogs.find((log) => log.date === key) || {
      date: key,
      hours: 0,
      consistency: "Weak",
      notes: "No status update yet.",
    }
  );
}

function upsertDailyLog(log) {
  const key = log.date || toDateKey();
  const existing = S.dailyLogs.find((item) => item.date === key);
  const next = {
    id: existing?.id || uid(),
    date: key,
    hours: +log.hours || 0,
    consistency: normalizeConfidence(log.consistency || "Weak"),
    notes: log.notes || "",
  };

  if (existing) {
    Object.assign(existing, next);
  } else {
    S.dailyLogs.push(next);
  }
}

function getConsistencySummary() {
  const days = 7;
  let hit = 0;
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = toDateKey(d);
    const log = S.dailyLogs.find((item) => item.date === key);
    if (log && Number(log.hours || 0) >= Number(S.dailyTarget || 0)) hit += 1;
  }
  return { days, hit, score: Math.round((hit / days) * 100) };
}

function renderDashboard() {
  const topics = S.topics;
  const total = topics.length;
  const done = topics.filter((t) => t.status === "Completed").length;
  const inProgress = topics.filter((t) => t.status === "In Progress").length;
  const expected = topics.reduce((sum, t) => sum + (+t.expected || 0), 0);
  const taken = topics.reduce((sum, t) => sum + (+t.taken || 0), 0);
  const overall = total
    ? Math.round(topics.reduce((sum, t) => sum + pct(t.covered), 0) / total)
    : 0;

  const timerTopic = $("timerTopic");
  if (timerTopic) {
    const currentTopicId = S.selected || (topics[0] && topics[0].id);
    timerTopic.innerHTML = topics
      .map(
        (topic) =>
          `<option value="${topic.id}" ${topic.id === currentTopicId ? "selected" : ""}>${esc(topic.name)}</option>`,
      )
      .join("");
    timerTopic.value = currentTopicId || "";
  }

  $("overall").textContent = overall + "%";
  if ($("overallBar")) $("overallBar").style.width = overall + "%";
  $("donePill").textContent = `${done} / ${total} completed`;
  $("completed").textContent = done;
  $("inprogress").textContent = inProgress;
  $("remaining").textContent = Math.max(0, total - done);
  $("expected").textContent = hrs(expected);
  $("taken").textContent = hrs(taken);
  $("left").textContent = hrs(Math.max(0, expected - taken));

  const targetDate = new Date(S.targetDate);
  $("targetLabel").textContent = targetDate.toLocaleDateString([], {
    month: "long",
    year: "numeric",
  });
  $("targetLine").textContent =
    "Target: " +
    targetDate.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  countdown();

  const active = currentTopic();
  if (active) {
    S.selected = active.id;
    $("currentName").textContent = active.name;
    $("currentCourse").textContent = active.course;
    $("currentStatus").textContent = active.status;
    $("currentStatus").className = `status-chip ${statusClass(active.status)}`;
    $("currentExpected").textContent = hrs(active.expected);
    $("currentTaken").textContent = hrs(active.taken);
    $("currentCovered").textContent = pct(active.covered) + "%";
    $("currentBar").style.width = pct(active.covered) + "%";
    $("currentRemarks").textContent = active.remarks || "No remarks yet.";
    $("sessionBtn").textContent =
      timer.on && timer.id === active.id ? "Stop session" : "Start session";
  } else {
    $("currentName").textContent = "No topic selected";
    $("currentCourse").textContent = "—";
    $("currentStatus").textContent = "Not Started";
    $("currentStatus").className = "status-chip status-not";
    $("currentExpected").textContent = "0h";
    $("currentTaken").textContent = "0h";
    $("currentCovered").textContent = "0%";
    $("currentBar").style.width = "0%";
    $("currentRemarks").textContent =
      "Select a topic to make it your current focus.";
    $("sessionBtn").textContent = "Start session";
  }

  const next = topics
    .filter((t) => t.status !== "Completed")
    .sort((a, b) => (a.plannedDate || "9").localeCompare(b.plannedDate || "9"))
    .slice(0, 5);

  $("upNext").innerHTML = next.length
    ? next
        .map(
          (t) => `
        <div class="up">
          <b>${esc(t.name)}</b>
          <span>${esc(t.course)} • ${hrs(t.expected)} • ${pct(t.covered)}%</span>
          <button data-select="${t.id}">${t.id === S.selected ? "Current focus" : "Make current"}</button>
        </div>`,
        )
        .join("")
    : '<p class="muted">Everything is complete.</p>';

  const revisionQueue = getRevisionQueue();
  const revisionNeeded = $("revisionNeeded");
  if (revisionNeeded) {
    revisionNeeded.innerHTML = revisionQueue.length
      ? `<div class="mini-list">${revisionQueue
          .slice(0, 5)
          .map(
            (item) =>
              `<div class="mini-item"><b>${esc(item.topic)}</b><small>${esc(item.course)} • ${esc(item.confidence)}</small></div>`,
          )
          .join(
            "",
          )}</div><button class="btn secondary small" data-goto="revision">Open Revision</button>`
      : '<p class="muted">Everything is on track.</p>';
  }

  const activeProject =
    S.projects.find(
      (p) => p.status !== "Completed" && p.status !== "Archived",
    ) || S.projects[0];
  const activeProjectCard = $("activeProjectCard");
  if (activeProjectCard) {
    activeProjectCard.innerHTML = activeProject
      ? `<div class="project-pill"><b>${esc(activeProject.name)}</b><small>${esc(activeProject.type)} • ${activeProject.progress}%</small><div class="mini-progress"><i style="width:${activeProject.progress}%"></i></div></div>`
      : '<p class="muted">No active project yet.</p>';
  }

  const todayLog = getTodayLog();
  const consistency = getConsistencySummary();
  const todayFocus = $("todayFocus");
  if (todayFocus) {
    todayFocus.innerHTML = `
      <div class="focus-list">
        <div><label>Learning</label><strong>${esc(active ? active.name : "No topic selected")}</strong><small>${esc(active ? active.course : "Set a focus topic")}</small></div>
        <div><label>Revision</label><strong>${revisionQueue[0] ? esc(revisionQueue[0].topic) : "No revision"}</strong><small>${revisionQueue[0] ? esc(revisionQueue[0].confidence) : "All clear"}</small></div>
        <div><label>Project</label><strong>${esc(activeProject ? activeProject.name : "No active project")}</strong><small>${activeProject ? activeProject.progress + "% progress" : "Create one now"}</small></div>
      </div>`;
  }

  const dailyCheckin = $("dailyCheckin");
  if (dailyCheckin) {
    dailyCheckin.innerHTML = `
      <div class="checkin-box">
        <label>Study hours today<input id="dailyHours" type="number" min="0" max="12" step="0.25" value="${todayLog.hours || 0}"></label>
        <label>Consistency<select id="dailyConfidence">
          <option ${todayLog.consistency === "Weak" ? "selected" : ""}>Weak</option>
          <option ${todayLog.consistency === "Needs Practice" ? "selected" : ""}>Needs Practice</option>
          <option ${todayLog.consistency === "Good" ? "selected" : ""}>Good</option>
          <option ${todayLog.consistency === "Strong" ? "selected" : ""}>Strong</option>
        </select></label>
        <label>Daily note<textarea id="dailyNotes" rows="3">${esc(todayLog.notes || "")}</textarea></label>
        <button class="btn primary" id="saveDailyStatus">Save daily status</button>
        <div class="tiny"><strong>${consistency.hit}/${consistency.days}</strong> days on target this week</div>
      </div>`;
  }
}

function countdown() {
  const target = new Date(S.targetDate).getTime();
  const diff = target - Date.now();
  const el = $("countdown");
  if (!el) return;

  if (diff <= 0) {
    el.innerHTML =
      '<span class="countdown-days">0</span><span class="countdown-parts"><span>00</span><span class="colon">:</span><span>00</span><span class="colon">:</span><span>00</span></span>';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  el.innerHTML = `
    <span class="countdown-days">${days}</span>
    <span class="countdown-parts">
      <span>${String(hours).padStart(2, "0")}</span>
      <span class="colon">:</span>
      <span>${String(mins).padStart(2, "0")}</span>
      <span class="colon">:</span>
      <span>${String(secs).padStart(2, "0")}</span>
    </span>
  `;
}

function renderRevision() {
  const courseFilter = $("revisionCourseFilter");
  const statusFilter = $("revisionStatusFilter");
  const confidenceFilter = $("revisionConfidenceFilter");

  if (courseFilter) {
    const courses = [...new Set(S.revisionItems.map((i) => i.course))].sort();
    courseFilter.innerHTML =
      '<option value="all">All courses</option>' +
      courses
        .map(
          (course) => `<option value="${esc(course)}">${esc(course)}</option>`,
        )
        .join("");
  }

  const filters = {
    course: courseFilter ? courseFilter.value : "all",
    status: statusFilter ? statusFilter.value : "all",
    confidence: confidenceFilter ? confidenceFilter.value : "all",
  };

  const filtered = S.revisionItems.filter((item) => {
    const byCourse = filters.course === "all" || item.course === filters.course;
    const byStatus = filters.status === "all" || item.status === filters.status;
    const byConfidence =
      filters.confidence === "all" || item.confidence === filters.confidence;
    return byCourse && byStatus && byConfidence;
  });

  const queue = getRevisionQueue();
  $("revisionQueue").innerHTML = queue.length
    ? queue
        .slice(0, 6)
        .map(
          (item) => `
        <div class="revision-queue-item">
          <div><b>${esc(item.topic)}</b><small>${esc(item.course)} • ${esc(item.subtopic || item.topic)}</small></div>
          <div class="meta">
            <span class="status ${revisionClass(item.status)}">${esc(item.status)}</span>
            <small>${esc(item.confidence)}</small>
            <button class="btn secondary small" data-review-id="${item.id}" data-revision-action="edit">Review</button>
          </div>
        </div>`,
        )
        .join("")
    : '<p class="muted">No topics currently need revision.</p>';

  $("revisionList").innerHTML = filtered.length
    ? filtered
        .map(
          (item) => `
        <article class="revision-card" data-revision-id="${item.id}">
          <div class="row between">
            <div><small>${esc(item.course)}</small><h3>${esc(item.topic)}</h3></div>
            <span class="status ${revisionClass(item.status)}">${esc(item.status)}</span>
          </div>
          <div class="meta-row">
            <span>Confidence: ${esc(item.confidence || "Weak")}</span>
            <span>Revision count: ${item.revisionCount || 0}</span>
            <span>Next review: ${esc(item.nextReview || "Not set")}</span>
          </div>
          <p>${esc(item.notes || "No notes yet.")}</p>
          <div class="row">
            <button class="btn secondary small" data-review-id="${item.id}" data-revision-action="edit">Edit</button>
            <button class="btn primary small" data-review-id="${item.id}" data-revision-action="review">Mark reviewed</button>
          </div>
        </article>`,
        )
        .join("")
    : '<p class="muted">No revision items match the current filters.</p>';
}

function renderProjects() {
  const query = ($("projectSearch")?.value || "").toLowerCase();
  const projects = S.projects.filter(
    (project) =>
      !query ||
      project.name.toLowerCase().includes(query) ||
      (project.type || "").toLowerCase().includes(query),
  );

  $("projectList").innerHTML = projects.length
    ? projects
        .map(
          (project) => `
      <article class="project-card" data-project-id="${project.id}">
        <div class="row between">
          <div><small>${esc(project.type)}</small><h3>${esc(project.name)}</h3></div>
          <span class="status ${project.status === "Completed" ? "done" : project.status === "Blocked" ? "warn" : "not"}">${esc(project.status)}</span>
        </div>
        <div class="progress"><i style="width:${project.progress || 0}%"></i></div>
        <div class="project-meta"><span>${project.progress || 0}%</span><span>Target: ${esc(project.target || "Portfolio")}</span></div>
        <div class="tech-cloud">${(project.technologies || [])
          .slice(0, 5)
          .map((tag) => `<span>${esc(tag)}</span>`)
          .join("")}</div>
      </article>`,
        )
        .join("")
    : '<p class="muted">No projects yet.</p>';
}

function renderCourses() {
  const courseFilter = $("courseFilter");
  const statusFilter = $("statusFilter");
  const q = ($("search")?.value || "").toLowerCase();
  const courseValue = courseFilter ? courseFilter.value : "all";
  const statusValue = statusFilter ? statusFilter.value : "all";

  if (courseFilter) {
    const courses = [...new Set(S.topics.map((t) => t.course))].sort();
    courseFilter.innerHTML =
      '<option value="all">All courses</option>' +
      courses
        .map(
          (course) => `<option value="${esc(course)}">${esc(course)}</option>`,
        )
        .join("");
    courseFilter.value = courses.includes(courseValue) ? courseValue : "all";
  }

  const filtered = S.topics.filter((t) => {
    const matchesCourse = courseValue === "all" || t.course === courseValue;
    const matchesStatus = statusValue === "all" || t.status === statusValue;
    const matchesText =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.course.toLowerCase().includes(q);
    return matchesCourse && matchesStatus && matchesText;
  });

  const byCourse = [...new Set(filtered.map((t) => t.course))];
  $("courseList").innerHTML = byCourse.length
    ? byCourse
        .map((course) => {
          const items = filtered.filter((t) => t.course === course);
          const avg =
            items.reduce((sum, t) => sum + pct(t.covered), 0) / items.length;
          return `
          <div class="course">
            <div class="course-head" data-collapse="${esc(course)}">
              <div><h3>${esc(course)}</h3><span>${items.length} topics • ${Math.round(avg)}%</span></div>
              <span>⌄</span>
            </div>
            <div class="course-body">
              <div class="trow header"><div>Topic</div><div>Expected</div><div>Taken</div><div>Covered</div><div>Status</div><div></div></div>
              ${items
                .map(
                  (t) => `
                <div class="trow">
                  <div class="topic"><b>${esc(t.name)}</b><small>${t.plannedDate ? "Planned " + esc(t.plannedDate) : "No date"}${t.priority === "High" ? " • High" : ""}</small></div>
                  <div class="td">${hrs(t.expected)}</div>
                  <div class="td">${hrs(t.taken)}</div>
                  <div><div class="td">${pct(t.covered)}%</div><div class="mini"><i style="width:${pct(t.covered)}%"></i></div></div>
                  <div><span class="status ${statusClass(t.status)}">${esc(t.status)}</span></div>
                  <div><button class="edit" data-edit="${t.id}">Edit</button></div>
                </div>`,
                )
                .join("")}
            </div>
          </div>`;
        })
        .join("")
    : '<div class="panel"><p class="muted">No matching topics.</p></div>';
}

function renderCalendar() {
  const y = cal.getFullYear();
  const m = cal.getMonth();
  const first = new Date(y, m, 1);
  const start = (first.getDay() + 6) % 7;
  const lastDay = new Date(y, m + 1, 0).getDate();

  $("monthTitle").textContent = cal.toLocaleDateString([], {
    month: "long",
    year: "numeric",
  });

  const header = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let out = header.map((day) => `<div class="dayname">${day}</div>`).join("");

  for (let i = 0; i < 42; i++) {
    const dayNumber = i - start + 1;
    const isMuted = dayNumber < 1 || dayNumber > lastDay;
    const date = isMuted
      ? new Date(
          y,
          m + (dayNumber > lastDay ? 1 : -1),
          dayNumber < 1
            ? new Date(y, m, 0).getDate() + dayNumber
            : dayNumber - lastDay,
        )
      : new Date(y, m, dayNumber);
    const dateKey = toDateKey(date);
    const today = dateKey === toDateKey();
    const events = S.topics.filter((t) => t.plannedDate === dateKey);

    out += `<div class="cell ${isMuted ? "muted" : ""} ${today ? "today" : ""}"><div class="date">${date.getDate()}</div>${events
      .slice(0, 3)
      .map(
        (t) =>
          `<button class="event ${statusClass(t.status)}" data-edit="${t.id}"><b>${esc(t.name)}</b><span>${esc(t.course)} • ${hrs(t.expected)}</span></button>`,
      )
      .join("")}</div>`;
  }

  $("calendarGrid").innerHTML = out;
}

function renderSettings() {
  const configuredClientId =
    (window.APP_CONFIG && window.APP_CONFIG.googleClientId) ||
    S.settings.clientId ||
    "";

  $("targetInput").value = S.targetDate;
  $("dailyInput").value = S.dailyTarget;
  $("clientId").value = configuredClientId;

  const statusEl = $("driveStatus");
  if (statusEl) {
    let statusText = "Not connected";
    if (driveToken) {
      statusText = autoSyncEnabled
        ? "✓ Connected • Auto-sync ON"
        : "✓ Connected • Manual mode";
    }
    statusEl.textContent = statusText;
  }

  const autoSyncCheckbox = $("autoSync");
  if (autoSyncCheckbox) {
    autoSyncCheckbox.checked = autoSyncEnabled;
  }
}

function renderAll() {
  renderDashboard();
  renderRevision();
  renderProjects();
  renderCourses();
  renderCalendar();
  renderSettings();
}

function show(viewName) {
  document
    .querySelectorAll(".view")
    .forEach((el) => el.classList.toggle("active", el.id === viewName));
  document
    .querySelectorAll(".nav")
    .forEach((el) =>
      el.classList.toggle("active", el.dataset.view === viewName),
    );
  $("pageTitle").textContent = viewName[0].toUpperCase() + viewName.slice(1);
  $("sidebar").classList.remove("open");
}

function modal(id = null) {
  const t = S.topics.find((x) => x.id === id);
  $("modal").hidden = false;
  $("topicId").value = id || "";
  $("modalType").textContent = id ? "EDIT TOPIC" : "NEW TOPIC";
  $("modalTitle").textContent = id ? "Edit topic" : "Add topic";
  $("fCourse").value = t?.course || "Python";
  $("fName").value = t?.name || "";
  $("fExpected").value = t?.expected ?? 2;
  $("fTaken").value = t?.taken ?? 0;
  $("fCovered").value = t?.covered ?? 0;
  $("fStatus").value = t?.status || "Not Started";
  $("fDate").value = t?.plannedDate || toDateKey();
  $("fPriority").value = t?.priority || "Normal";
  $("fRemarks").value = t?.remarks || "";
  $("deleteTopic").style.display = id ? "inline-block" : "none";
}

function closeModal() {
  $("modal").hidden = true;
}

function openRevisionModal(id = null) {
  const item = S.revisionItems.find((r) => r.id === id) || {
    id: null,
    course: "Python",
    topic: "",
    subtopic: "",
    status: "Needs Revision",
    confidence: "Weak",
    lastRevised: "",
    nextReview: "",
    revisionCount: 0,
    priority: "High",
    notes: "",
  };

  $("revisionModal").hidden = false;
  $("revisionId").value = item.id || "";
  $("revCourse").value = item.course || "Python";
  $("revTopic").value = item.topic || "";
  $("revSubtopic").value = item.subtopic || "";
  $("revStatus").value = item.status || "Needs Revision";
  $("revConfidence").value = item.confidence || "Weak";
  $("revLast").value = item.lastRevised || "";
  $("revNext").value = item.nextReview || "";
  $("revCount").value = item.revisionCount || 0;
  $("revPriority").value = item.priority || "High";
  $("revNotes").value = item.notes || "";
}

function closeRevisionModal() {
  $("revisionModal").hidden = true;
}

function openProjectModal(id = null) {
  const project = S.projects.find((p) => p.id === id) || {
    id: null,
    name: "",
    type: "Full-Stack AI",
    status: "Idea",
    progress: 0,
    target: "Portfolio",
    priority: "Medium",
    description: "",
    goal: "",
    startDate: toDateKey(),
    targetDate: toDateKey(new Date(Date.now() + 86400000 * 30)),
    repositoryLink: "",
    liveLink: "",
    documentationLink: "",
    designLink: "",
    notes: "",
    technologies: ["Python"],
    expectedHours: 40,
    takenHours: 0,
    tasks: [],
  };

  $("projectModal").hidden = false;
  $("projectId").value = project.id || "";
  $("projectName").value = project.name || "";
  $("projectType").value = project.type || "Full-Stack AI";
  $("projectStatus").value = project.status || "Idea";
  $("projectProgress").value = project.progress || 0;
  $("projectTarget").value = project.target || "Portfolio";
  $("projectPriority").value = project.priority || "Medium";
  $("projectStart").value = project.startDate || toDateKey();
  $("projectTargetDate").value =
    project.targetDate || toDateKey(new Date(Date.now() + 86400000 * 30));
  $("projectRepo").value = project.repositoryLink || "";
  $("projectLive").value = project.liveLink || "";
  $("projectDocs").value = project.documentationLink || "";
  $("projectDesign").value = project.designLink || "";
  $("projectGoals").value = project.goal || "";
  $("projectDescription").value = project.description || "";
  $("projectNotes").value = project.notes || "";
  $("projectTech").value = (project.technologies || []).join(", ");
  $("projectExpected").value = project.expectedHours || 0;
  $("projectTaken").value = project.takenHours || 0;

  const taskList = $("projectTaskList");
  taskList.innerHTML =
    (project.tasks || [])
      .map(
        (task, idx) => `
    <div class="task-row" data-task-index="${idx}">
      <input value="${esc(task.title || "")}" class="task-title" />
      <select class="task-status">
        <option ${task.status === "To Do" ? "selected" : ""}>To Do</option>
        <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
        <option ${task.status === "Blocked" ? "selected" : ""}>Blocked</option>
      </select>
      <input type="number" class="task-hours" value="${task.actualHours || 0}" placeholder="Actual hrs" />
      <button type="button" class="btn danger small delete-task">Remove</button>
    </div>`,
      )
      .join("") || '<p class="muted">No tasks yet.</p>';
}

function closeProjectModal() {
  $("projectModal").hidden = true;
}

function markRevisionReviewed(id) {
  const item = S.revisionItems.find((r) => r.id === id);
  if (!item) return;
  item.status = "Reviewed";
  item.confidence = normalizeConfidence(
    item.confidence === "Weak" ? "Needs Practice" : item.confidence,
  );
  item.revisionCount = (+item.revisionCount || 0) + 1;
  item.lastRevised = toDateKey();
  item.nextReview = toDateKey(new Date(Date.now() + 86400000 * 7));
  save();
  toast("Revision updated");
}

function toggleTimer(id) {
  if (timer.on) {
    stopTimer();
    return;
  }

  const topic = S.topics.find((x) => x.id === id);
  if (!topic) return;

  timer = {
    on: true,
    id,
    start: Date.now(),
    handle: setInterval(() => {}, 1000),
  };
  if (topic.status === "Not Started") topic.status = "In Progress";
  S.selected = id;
  save();
  toast("Session started");
}

function stopTimer() {
  if (!timer.on) return;
  const topic = S.topics.find((x) => x.id === timer.id);
  const seconds = Math.max(1, Math.floor((Date.now() - timer.start) / 1000));
  const hours = seconds / 3600;

  if (topic) {
    topic.taken = +(topic.taken || 0) + hours;
    S.sessions.push({
      id: uid(),
      topicId: topic.id,
      seconds,
      startedAt: new Date(timer.start).toISOString(),
      endedAt: new Date().toISOString(),
    });
  }

  clearInterval(timer.handle);
  timer = { on: false, id: null, start: 0, handle: null };
  save();
  toast(`Added ${hrs(hours)} to ${topic?.name || "topic"}`);
}

function exportData() {
  const data = JSON.stringify(S, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "job-switch-tracker.json";
  a.click();
  URL.revokeObjectURL(url);
  toast("Backup exported");
}

async function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported.topics || !imported.targetDate)
        throw new Error("Invalid data");
      S = imported;
      save();
      toast("Backup imported");
    } catch {
      alert("Invalid tracker JSON");
    }
  };
  reader.readAsText(file);
}

async function loadGoogleClient() {
  if (window.google && window.google.accounts && window.google.accounts.oauth2)
    return;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function connectDrive() {
  const clientId =
    (window.APP_CONFIG && window.APP_CONFIG.googleClientId
      ? window.APP_CONFIG.googleClientId
      : S.settings.clientId?.trim()) || "";

  if (!clientId) {
    toast("Add GOOGLE_CLIENT_ID in env and regenerate config.js");
    return;
  }

  await loadGoogleClient();
  driveToken = await new Promise((resolve, reject) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: DRIVE_SCOPE,
      callback: (response) =>
        response.error ? reject(response) : resolve(response.access_token),
    });
    client.requestAccessToken({ prompt: "consent" });
  });

  // Start auto-sync check when connected
  if (autoSyncEnabled) {
    startAutoSyncCheck();
  }

  renderSettings();
  toast("✓ Google Drive connected");
}

async function driveFiles() {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${DRIVE_NAME}' and trashed=false`)}&fields=files(id,name,modifiedTime)`,
    {
      headers: { Authorization: "Bearer " + driveToken },
    },
  );

  if (!response.ok) throw new Error("Drive list failed");
  return (await response.json()).files || [];
}

async function driveSave() {
  if (!driveToken) await connectDrive();
  if (!driveToken) return;

  // Add timestamp to track when this version was saved
  S.mergeTimestamp = Date.now();

  const existing = (await driveFiles())[0];
  const metadata = new Blob(
    [JSON.stringify({ name: DRIVE_NAME, mimeType: "application/json" })],
    { type: "application/json" },
  );
  const content = new Blob([JSON.stringify(S)], { type: "application/json" });
  const form = new FormData();
  form.append("metadata", metadata);
  form.append("file", content, DRIVE_NAME);

  const url = existing
    ? `https://www.googleapis.com/upload/drive/v3/files/${existing.id}?uploadType=multipart`
    : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";

  const response = await fetch(url, {
    method: existing ? "PATCH" : "POST",
    headers: { Authorization: "Bearer " + driveToken },
    body: form,
  });

  if (!response.ok) throw new Error("Drive save failed");

  lastDriveSyncTime = Date.now();
  const msg = existing
    ? "✓ Synced to Google Drive"
    : "✓ Created backup on Google Drive";
  toast(msg);
}

async function driveLoad() {
  if (!driveToken) await connectDrive();
  if (!driveToken) return;

  const existing = (await driveFiles())[0];
  if (!existing) {
    toast("No tracker backup found on Drive");
    return;
  }

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${existing.id}?alt=media`,
    {
      headers: { Authorization: "Bearer " + driveToken },
    },
  );

  if (!response.ok) throw new Error("Drive load failed");
  const driveData = await response.json();
  if (!driveData.topics) throw new Error("Invalid backup");

  // Timestamp-based merge for real-time multi-device sync
  const mergeTimestamp = driveData.mergeTimestamp || Date.now();
  const localTimestamp = S.mergeTimestamp || 0;

  // If Drive is newer, use Drive as base and add local-only items
  if (mergeTimestamp > localTimestamp) {
    // Keep all Drive data
    S.targetDate = driveData.targetDate || S.targetDate;
    S.dailyTarget = driveData.dailyTarget || S.dailyTarget;
    S.settings = { ...driveData.settings, ...S.settings };

    // Merge topics: Drive items + any local-only items
    const driveTopicIds = new Set(driveData.topics.map((t) => t.id));
    const localOnlyTopics = S.topics.filter((t) => !driveTopicIds.has(t.id));
    S.topics = [...driveData.topics, ...localOnlyTopics];

    // Merge revision items
    const driveRevIds = new Set(
      driveData.revisionItems?.map((r) => r.id) || [],
    );
    const localOnlyRev = S.revisionItems.filter((r) => !driveRevIds.has(r.id));
    S.revisionItems = [...(driveData.revisionItems || []), ...localOnlyRev];

    // Merge projects
    const driveProjIds = new Set(driveData.projects?.map((p) => p.id) || []);
    const localOnlyProj = S.projects.filter((p) => !driveProjIds.has(p.id));
    S.projects = [...(driveData.projects || []), ...localOnlyProj];

    S.mergeTimestamp = mergeTimestamp;
    save();
    lastDriveLoadTime = Date.now();
    toast("✓ Synced from Drive (latest data merged)");
  } else {
    // Local is newer or same, just add Drive-only items
    const localTopicIds = new Set(S.topics.map((t) => t.id));
    const driveNewTopics = driveData.topics.filter(
      (t) => !localTopicIds.has(t.id),
    );
    S.topics = [...S.topics, ...driveNewTopics];

    const localRevIds = new Set(S.revisionItems.map((r) => r.id));
    const driveNewRev = (driveData.revisionItems || []).filter(
      (r) => !localRevIds.has(r.id),
    );
    S.revisionItems = [...S.revisionItems, ...driveNewRev];

    const localProjIds = new Set(S.projects.map((p) => p.id));
    const driveNewProj = (driveData.projects || []).filter(
      (p) => !localProjIds.has(p.id),
    );
    S.projects = [...S.projects, ...driveNewProj];

    if (driveNewTopics.length || driveNewRev.length || driveNewProj.length) {
      save();
      toast("✓ Added new items from Drive");
    }
  }

  lastDriveLoadTime = Date.now();
}

// Periodic sync check: pull changes from Drive every 30 seconds if auto-sync is on
function startAutoSyncCheck() {
  if (syncCheckInterval) clearInterval(syncCheckInterval);

  syncCheckInterval = setInterval(async () => {
    if (driveToken && autoSyncEnabled) {
      try {
        // Silent sync - don't show toast unless there are changes
        const existing = (await driveFiles())[0];
        if (existing) {
          const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${existing.id}?alt=media`,
            {
              headers: { Authorization: "Bearer " + driveToken },
            },
          );
          if (response.ok) {
            const driveData = await response.json();
            const mergeTimestamp = driveData.mergeTimestamp || Date.now();
            const localTimestamp = S.mergeTimestamp || 0;

            // Only load if Drive has newer data
            if (mergeTimestamp > localTimestamp) {
              await driveLoad();
            }
          }
        }
      } catch (e) {
        console.error("Auto-sync check failed:", e);
      }
    }
  }, 30000); // Check every 30 seconds
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest(".nav");
  if (nav) return show(nav.dataset.view);

  const goto = event.target.closest("[data-goto]");
  if (goto) return show(goto.dataset.goto);

  const edit = event.target.closest("[data-edit]");
  if (edit) {
    S.selected = edit.dataset.edit;
    save();
    return modal(edit.dataset.edit);
  }

  const select = event.target.closest("[data-select]");
  if (select) {
    S.selected = select.dataset.select;
    save();
    return;
  }

  const collapse = event.target.closest("[data-collapse]");
  if (collapse) {
    const panel = collapse.nextElementSibling;
    if (panel)
      panel.style.display = panel.style.display === "none" ? "" : "none";
    return;
  }

  if (event.target.closest("#saveDailyStatus")) {
    upsertDailyLog({
      date: toDateKey(),
      hours: Number($("dailyHours").value || 0),
      consistency: $("dailyConfidence").value,
      notes: $("dailyNotes").value.trim(),
    });
    save();
    toast("Daily study update saved");
    return;
  }

  if (event.target.closest("#timerTopic")) {
    const topicId = $("timerTopic").value;
    if (topicId) {
      S.selected = topicId;
      renderDashboard();
    }
    return;
  }

  if (event.target.closest("[data-review-id]")) {
    const trigger = event.target.closest("[data-review-id]");
    const id = trigger.dataset.reviewId;
    const action = trigger.dataset.revisionAction || "edit";
    if (action === "review") {
      markRevisionReviewed(id);
      return;
    }
    openRevisionModal(id);
    return;
  }

  if (event.target.closest("[data-project-id]")) {
    const projectId =
      event.target.closest("[data-project-id]").dataset.projectId;
    openProjectModal(projectId);
    return;
  }

  if (event.target.closest("#closeRevision")) return closeRevisionModal();
  if (event.target.closest("#closeRevisionBtn")) return closeRevisionModal();
  if (event.target.closest("#closeProject")) return closeProjectModal();
  if (event.target.closest("#cancelProject")) return closeProjectModal();

  if (event.target.closest("#saveRevision")) {
    const id = $("revisionId").value;
    const item = {
      id: id || uid(),
      course: $("revCourse").value.trim(),
      topic: $("revTopic").value.trim(),
      subtopic: $("revSubtopic").value.trim(),
      status: $("revStatus").value,
      confidence: normalizeConfidence($("revConfidence").value),
      lastRevised: $("revLast").value || "",
      nextReview: $("revNext").value || "",
      revisionCount: Number($("revCount").value || 0),
      priority: $("revPriority").value,
      notes: $("revNotes").value.trim(),
    };

    const index = S.revisionItems.findIndex((r) => r.id === item.id);
    if (index >= 0) S.revisionItems[index] = item;
    else S.revisionItems.push(item);

    save();
    closeRevisionModal();
    toast("Revision saved");
    return;
  }

  if (event.target.closest("#deleteRevision")) {
    const id = $("revisionId").value;
    if (id) S.revisionItems = S.revisionItems.filter((item) => item.id !== id);
    save();
    closeRevisionModal();
    toast("Revision deleted");
    return;
  }

  if (event.target.closest("#saveProject")) {
    const id = $("projectId").value;
    const project = {
      id: id || uid(),
      name: $("projectName").value.trim(),
      type: $("projectType").value.trim(),
      status: $("projectStatus").value,
      target: $("projectTarget").value.trim(),
      progress: Number($("projectProgress").value || 0),
      priority: $("projectPriority").value,
      description: $("projectDescription").value.trim(),
      goal: $("projectGoals").value.trim(),
      startDate: $("projectStart").value || toDateKey(),
      targetDate:
        $("projectTargetDate").value ||
        toDateKey(new Date(Date.now() + 86400000 * 30)),
      repositoryLink: $("projectRepo").value.trim(),
      liveLink: $("projectLive").value.trim(),
      documentationLink: $("projectDocs").value.trim(),
      designLink: $("projectDesign").value.trim(),
      notes: $("projectNotes").value.trim(),
      technologies: $("projectTech")
        .value.split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      expectedHours: Number($("projectExpected").value || 0),
      takenHours: Number($("projectTaken").value || 0),
      tasks: Array.from(document.querySelectorAll(".task-row"))
        .map((row) => ({
          id: uid(),
          title: row.querySelector(".task-title").value.trim(),
          status: row.querySelector(".task-status").value,
          actualHours: Number(row.querySelector(".task-hours").value || 0),
          priority: "Medium",
          estimatedHours: 4,
          remarks: "",
        }))
        .filter((task) => task.title),
    };

    const index = S.projects.findIndex((item) => item.id === project.id);
    if (index >= 0) S.projects[index] = { ...S.projects[index], ...project };
    else S.projects.push(project);

    save();
    closeProjectModal();
    toast("Project saved");
    return;
  }

  if (event.target.closest("#deleteProject")) {
    const id = $("projectId").value;
    if (id && confirm("Delete this project?")) {
      S.projects = S.projects.filter((project) => project.id !== id);
      save();
      closeProjectModal();
      toast("Project deleted");
    }
    return;
  }

  if (event.target.closest(".delete-task")) {
    const row = event.target.closest(".task-row");
    if (row) row.remove();
    return;
  }

  if (event.target.closest("#addTaskRow")) {
    const list = $("projectTaskList");
    const row = document.createElement("div");
    row.className = "task-row";
    row.innerHTML = `
      <input value="" class="task-title" placeholder="Task" />
      <select class="task-status"><option>To Do</option><option>In Progress</option><option>Completed</option><option>Blocked</option></select>
      <input type="number" class="task-hours" value="0" placeholder="Actual hrs" />
      <button type="button" class="btn danger small delete-task">Remove</button>`;
    list.appendChild(row);
    return;
  }
});

$("menuBtn").onclick = () => $("sidebar").classList.toggle("open");
$("quickAdd").onclick = () => modal();
$("addTopic").onclick = () => modal();
$("currentEdit").onclick = () => S.selected && modal(S.selected);
$("sessionBtn").onclick = () => S.selected && toggleTimer(S.selected);
$("timerTopic").onchange = () => {
  const topicId = $("timerTopic").value;
  if (topicId) {
    S.selected = topicId;
    save();
  }
};
$("courseFilter").onchange = renderCourses;
$("statusFilter").onchange = renderCourses;
$("search").oninput = renderCourses;
$("revisionCourseFilter").onchange = renderRevision;
$("revisionStatusFilter").onchange = renderRevision;
$("revisionConfidenceFilter").onchange = renderRevision;
$("projectSearch").oninput = renderProjects;
$("addRevision").onclick = () => openRevisionModal();
$("addProject").onclick = () => openProjectModal();
$("prev").onclick = () => {
  cal = new Date(cal.getFullYear(), cal.getMonth() - 1, 1);
  renderCalendar();
};
$("next").onclick = () => {
  cal = new Date(cal.getFullYear(), cal.getMonth() + 1, 1);
  renderCalendar();
};
$("today").onclick = () => {
  const d = new Date();
  cal = new Date(d.getFullYear(), d.getMonth(), 1);
  renderCalendar();
};

$("closeModal").onclick = closeModal;
$("cancelModal").onclick = closeModal;
$("modal").onclick = (event) => {
  if (event.target.id === "modal") closeModal();
};
$("topicForm").onsubmit = (event) => {
  event.preventDefault();
  const id = $("topicId").value;
  const data = {
    course: $("fCourse").value.trim(),
    name: $("fName").value.trim(),
    expected: Number($("fExpected").value || 0),
    taken: Number($("fTaken").value || 0),
    covered: pct($("fCovered").value),
    status: $("fStatus").value,
    plannedDate: $("fDate").value,
    priority: $("fPriority").value,
    remarks: $("fRemarks").value.trim(),
  };

  if (data.covered >= 100) data.status = "Completed";

  if (id) {
    const target = S.topics.find((topic) => topic.id === id);
    if (target) Object.assign(target, data);
  } else {
    const newTopic = { id: uid(), ...data };
    S.topics.push(newTopic);
    S.selected = newTopic.id;
  }

  save();
  closeModal();
  toast("Topic saved");
};

$("deleteTopic").onclick = () => {
  const id = $("topicId").value;
  if (id && confirm("Delete this topic?")) {
    S.topics = S.topics.filter((topic) => topic.id !== id);
    if (S.selected === id) S.selected = null;
    save();
    closeModal();
    toast("Topic deleted");
  }
};

$("export1").onclick = exportData;
$("export2").onclick = exportData;
$("importInput").onchange = (e) =>
  e.target.files[0] && importData(e.target.files[0]);
$("saveSettings").onclick = () => {
  S.targetDate = $("targetInput").value;
  S.dailyTarget = Number($("dailyInput").value || 0);
  S.settings.clientId = $("clientId").value.trim();
  if (window.APP_CONFIG && window.APP_CONFIG.googleClientId) {
    S.settings.clientId = window.APP_CONFIG.googleClientId;
  }
  save();
  toast("Settings saved");
};
$("reset").onclick = () => {
  if (confirm("Reset all progress to the starter plan?")) {
    S = createStarterState();
    save();
    toast("Starter plan restored");
  }
};
$("clientId").onchange = (e) => {
  S.settings.clientId = e.target.value.trim();
  localStorage.setItem(KEY, JSON.stringify(S));
};
$("driveConnect").onclick = async () => {
  try {
    await connectDrive();
  } catch (e) {
    console.error(e);
    toast("Google Drive connection failed");
  }
};
$("driveSave").onclick = async () => {
  try {
    await driveSave();
  } catch (e) {
    console.error(e);
    toast("Drive save failed");
  }
};
$("driveLoad").onclick = async () => {
  try {
    await driveLoad();
  } catch (e) {
    console.error(e);
    toast("Drive load failed");
  }
};

const autoSyncCheckbox = $("autoSync");
if (autoSyncCheckbox) {
  autoSyncCheckbox.onchange = (e) => {
    autoSyncEnabled = e.target.checked;
    if (autoSyncEnabled && !driveToken) {
      toast("Connect to Google Drive first");
      e.target.checked = false;
      return;
    }

    if (autoSyncEnabled) {
      startAutoSyncCheck();
      toast("✓ Auto-sync enabled (real-time across devices)");
    } else {
      if (syncCheckInterval) {
        clearInterval(syncCheckInterval);
        syncCheckInterval = null;
      }
      toast("Auto-sync disabled");
    }
    renderSettings();
  };
}

setInterval(countdown, 1000);
renderAll();
