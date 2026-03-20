# 🛡️ GigShield — AI-Powered Parametric Income Insurance for India's Gig Economy
### Guidewire DEVTrails 2026 | Team Submission

---

<div align="center">
<h2>🛡️ GigShield</h2>

**Zero-touch, AI-native parametric insurance platform for Q-Commerce delivery partners in India**

Automatic disruption detection · Multi-source validation · Instant UPI payouts · Vernacular-first UX

![Tech Stack](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square)
![Tech Stack](https://img.shields.io/badge/ML-XGBoost%20%2B%20scikit--learn-FF6B6B?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Frontend-React%20PWA-61DAFB?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Database-PostgreSQL-336791?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Voice-Coqui%20TTS%20%2B%20eSpeak-FFA500?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Scheduling-APScheduler-4CAF50?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Geofencing-Uber%20H3-0078D4?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Payments-Razorpay-023DA1?style=flat-square)



</div>

---

## 📌 Table of Contents
1. [Problem Statement](#-problem-statement)
2. [Root Cause Analysis](#-root-cause-analysis)
3. [Our Solution](#-our-solution)
4. [Persona Focus](#-persona-focus)
5. [System Architecture](#-system-architecture--end-to-end-flow)
6. [Real Data Sources & Integrations](#-real-data-sources--integrations)
7. [Parametric Trigger Framework](#-parametric-trigger-framework)
8. [Multi-Source Validation Engine](#-multi-source-validation-engine)
9. [Weekly Premium Model](#-weekly-premium-model)
10. [AI/ML Architecture](#-aiml-architecture)
11. [Adversarial Defense & Anti-Spoofing Strategy](#-adversarial-defense--anti-spoofing-strategy)
12. [Novelty & Uniqueness](#-novelty--uniqueness)
13. [Tech Stack](#-tech-stack)
14. [Dashboard Design](#-dashboard-design)
15. [Team](#-team)


---

## 🔴 Problem Statement

India's gig economy powers 250+ million deliveries every month — driven by delivery partners on **Zepto, Blinkit, Swiggy Instamart, Zomato, Swiggy, Amazon, and Flipkart**. These workers are the invisible backbone of our digital economy. Yet, they are dangerously exposed.

> **Every time it rains heavily, every time a curfew drops, every time a local strike shuts down an area — a delivery worker loses income. Completely. Silently. With zero safety net.**

### The Hard Numbers

| Metric | Value |
|---|---|
| Active delivery partners in India | ~5 Million |
| Average monthly income | ₹15,000 – ₹25,000 |
| Income lost per major disruption event | 20–30% of monthly earnings |
| Existing parametric income-loss insurance for gig workers | ❌ None |
| Workers covered under any formal social security | < 4% |

### Why Existing Insurance Fails Gig Workers

- **Traditional insurance** — Monthly premiums, weeks-long claims, income proof documents: impossible for daily-wage workers
- **Health/Accident coverage** — Does not address income loss from environmental events
- **Employer-backed benefits** — Non-existent; platforms classify workers as "partners," not employees
- **Micro-insurance products** — Either too generic or require manual claim filing

**The core gap:** No product today says *"It flooded in your zone today. You couldn't work. Here is ₹300 automatically in your UPI wallet."*

---

## 🔍 Root Cause Analysis

```
Gig Worker Income Loss
        │
        ├── Environmental Disruptions
        │       ├── Extreme rainfall / Flooding
        │       ├── Heatwaves (Temp > 42°C / Heat Index > 54°C)
        │       ├── Cyclones / Thunderstorms
        │       └── Dense fog (visibility < 50m)
        │
        ├── Air Quality Emergencies
        │       ├── AQI Severe+ (> 400) — GRAP Stage 4
        │       └── Emergency outdoor work restrictions
        │
        ├── Social / Civic Disruptions
        │       ├── Sudden curfews (Section 144)
        │       ├── Bandh / Local strikes
        │       └── Road closures / zone shutdowns
        │
        └── Regulatory Restrictions
                ├── Odd-even vehicle schemes (Delhi, Bengaluru)
                ├── GRAP-based emergency vehicle restrictions
                └── Event-based road closures
```

**The worker has zero control over any of the above. Yet they bear 100% of the financial impact.**

---

## ✅ Our Solution

**GigShield** is a **fully automated, AI-native parametric income insurance platform** built exclusively for Q-Commerce delivery partners in India.

> **"We don't ask you to file a claim. Our models detect the disruption, validate it with multi-source evidence, and initiate your UPI payout — zero human intervention required."**

### Core Design Principles

1. **Zero-touch claims** — No forms, no calls, no documents. The system auto-triggers.
2. **Weekly rhythm** — Premiums and payouts match the gig worker's pay cycle.
3. **Hyperlocal precision** — Coverage is geofenced at 500m grid cell level, not city-wide.
4. **Income-loss only** — No health, no vehicle repair. Scope is surgical and clear.
5. **Multi-source validation** — Every trigger requires API signal + peer worker inactivity confirmation.
6. **Vernacular-first UX** — Voice onboarding and notifications in Tamil, Hindi, Telugu, Kannada, Bengali.

---

## 👤 Persona Focus

**Selected Persona: Q-Commerce / Grocery Delivery Partners (Zepto, Blinkit, Swiggy Instamart)**

### Why Q-Commerce?

| Factor | Reason |
|---|---|
| Time-pressure model | 10-minute SLA means workers are the most income-sensitive to even short disruptions |
| Zone clustering | Operate in tight hyperlocal dark store zones — ideal for geofenced parametric triggers |
| Weather sensitivity | Two-wheeler riders in rain/flood conditions face complete income stoppage |
| Underrepresented | Most insurtech focuses on Zomato/Swiggy food delivery; Q-commerce is entirely ignored |

### Worker Persona: "Ramesh"
- Age: 26, operating in Ambattur, Chennai
- Works 10 hrs/day, 6 days/week on Zepto
- Earns ~₹600/day on clear days, ~₹0 on flood days
- Uses UPI (PhonePe); speaks Tamil primarily

---

## ⚙️ System Architecture — End-to-End Flow

```
┌───────────────────────────────────────────────────────────────────────┐
│  STEP 1 — WORKER ONBOARDING                                           │
│  Phone OTP → Voice Onboarding (Regional Language via eSpeak NG/      │
│  Coqui TTS) → Zone Registration (lat/lon geofence)                   │
│  → AI Risk Profiling → Weekly Premium Calculated → Policy Activated  │
└────────────────────────────┬──────────────────────────────────────────┘
                             │
                             ▼
┌───────────────────────────────────────────────────────────────────────┐
│  STEP 2 — REAL-TIME DISRUPTION MONITORING (APScheduler) │
│                                                                       │
│  ┌─────────────────────┐   ┌──────────────────────┐                 │
│  │ Environmental APIs  │   │ Civic Disruption Feed │                 │
│  │ OpenWeatherMap      │   │ NewsAPI (geo-filtered) │                │
│  │ IMD RSS Alerts      │   │ Keyword NLP Classifier │                │
│  │ CPCB / AQICN AQI   │   │ (bandh, curfew, strike)│                │
│  └────────┬────────────┘   └──────────┬───────────┘                 │
│           └──────────┬────────────────┘                               │
│                      ▼                                                │
│        Disruption Candidate detected in Zone                          │
└────────────────────────────┬──────────────────────────────────────────┘
                             │
                             ▼
┌───────────────────────────────────────────────────────────────────────┐
│  STEP 3 — MULTI-SOURCE VALIDATION ENGINE                              │
│  ✅ API Signal confirmed in worker's geofenced zone                  │
│  ✅ ≥ 3 workers in same 500m grid went inactive simultaneously        │
│  → Disruption Severity Score (DSS) computed by GBDCM (XGBoost)      │
│    Output: DSS ∈ [0, 1] — continuous, not threshold-based           │
└────────────────────────────┬──────────────────────────────────────────┘
                             │
                             ▼
┌───────────────────────────────────────────────────────────────────────┐
│  STEP 4 — FRAUD DETECTION                                             │
│  Multi-Signal Consensus: GPS zone + external API + peer inactivity   │
│  + network/device signals → Fraud Risk Score ∈ [0, 1]               │
│  ML models: Isolation Forest + Clustering-based outlier detection    │
└────────────────────────────┬──────────────────────────────────────────┘
                             │
                             ▼
┌───────────────────────────────────────────────────────────────────────┐
│  STEP 5 — PAYOUT CALCULATION & DISBURSEMENT                          │
│  Payout = (1 - Fraud_Risk) × DSS × daily_income_baseline × tier     │
│  → Razorpay Sandbox / UPI initiated                                  │
│  → Worker notified in regional language via SMS + in-app            │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 🔌 Real Data Sources & Integrations

| # | Source | What We Use It For | Access Method |
|---|---|---|---|
| 1 | **OpenWeatherMap API** | Rainfall (mm/hr), temperature, wind speed, fog, cyclone alerts per lat/lon | REST API, free tier |
| 2 | **IMD RSS Feed** | Official red/orange/yellow weather alerts for states/districts | Public RSS + XML |
| 3 | **CPCB / AQICN API** | Real-time AQI readings per city monitoring station | REST API, free tier |
| 4 | **HERE Maps Traffic API** | Traffic speed, jam factor, congestion index (flood proxy) | REST API, free tier |
| 5 | **NewsAPI.org** | News articles filtered by geo-keywords + disruption keywords | REST API, free tier |
| 6 | **Open-Meteo API** | 5-year historical weather per lat/lon for zone risk scoring | REST API, free, no key |
| 7 | **Razorpay Sandbox** | Simulated UPI payout processing | Test mode API |
| 8 | **OpenStreetMap** | Geocoding, zone boundary mapping | Free REST API |
| 9 | **Uber H3 Python Library** | Hexagonal geofencing (~460m cells) |
| 10 | **eSpeak NG / Coqui TTS** | Offline Indic language voice synthesis (Tamil, Hindi, Telugu) | Open-source, self-hosted |


---

## ⚡ Parametric Trigger Framework

GigShield monitors **5 real, verifiable trigger categories**. Every trigger requires **dual confirmation**: API signal + peer worker inactivity in the same geofenced zone.

| # | Trigger | Primary Data Source | Secondary Source | Peer Validation |
|---|---|---|---|---|
| 1 | **Heavy Rainfall** | OpenWeatherMap: precipitation ≥ 15mm/hr | IMD red/orange alert for district | ≥ 3 workers inactive in zone |
| 2 | **Extreme Heat** | OpenWeatherMap: temp ≥ 42°C OR heat index ≥ 54°C | IMD heat wave alert | ≥ 3 workers inactive in zone |
| 3 | **Flood / Severe Congestion** | HERE Maps: jam factor ≥ 9 OR avg speed < 5 km/hr | OpenWeatherMap rainfall confirmed | ≥ 3 workers inactive in zone |
| 4 | **Air Quality Emergency** | CPCB/AQICN: AQI ≥ 400 (Severe+) | IMD pollution alert | ≥ 3 workers inactive in zone |
| 5 | **Civic Disruption** | NewsAPI: geo-filtered articles with keywords (bandh, curfew, Section 144, strike, hartal, ஊரடங்கு, बंद) | Peer inactivity spike in zone | ≥ 5 workers inactive in zone |


### Why Dual Confirmation?

A single API signal (e.g., rainfall in a city) does not guarantee income loss for a specific worker in a specific zone. Peer inactivity acts as the **ground-truth validator** — if multiple workers in the same 500m cell simultaneously stopped working, the income impact is real and localized. Both conditions are evaluated by the GBDCM model, not hard if-else logic.

---

## 🗺️ Multi-Source Validation Engine

The validation engine replaces all rule-based gates with a **Gradient Boosted Disruption Confirmation Model (GBDCM)** trained on XGBoost.

### GBDCM — Input Features & Training Data

```
┌─────────────────────────────────────────────────────────────────┐
│              GBDCM Feature Set (per zone, per event)            │
├─────────────────────────────────────────────────────────────────┤
│  From APIs:                                                     │
│  ├── rainfall_mm_hr          (OpenWeatherMap)                   │
│  ├── temperature_c           (OpenWeatherMap)                   │
│  ├── aqi_value               (CPCB/AQICN)                       │
│  ├── traffic_jam_factor      (HERE Maps)                        │
│  ├── traffic_avg_speed_kmph  (HERE Maps)                        │
│  ├── imd_alert_level         (IMD RSS — 0/1/2/3)               │
│  └── news_disruption_score   (NewsAPI NLP classifier output)    │
│                                                                 │
│  From Worker Network:                                           │
│  ├── peer_inactive_count_500m   (workers offline in same cell)  │
│  ├── peer_inactive_pct_zone     (% of active workers offline)   │
│  ├── inactivity_onset_speed     (how fast workers went offline) │
│  └── zone_historical_risk_score (5-year disruption frequency)  │
│                                                                 │
│  Temporal:                                                      │
│  ├── hour_of_day, day_of_week                                   │
│  └── season (monsoon/summer/winter/post_monsoon)               │
└─────────────────────────────────────────────────────────────────┘
OUTPUT: Disruption Severity Score (DSS) ∈ [0, 1]


**Peer Threshold Justification (≥3):**
The threshold of ≥3 inactive peers is the GBDCM's learned activation boundary, validated against multi-signal consensus. Initial bootstrapping uses zone density — sparser zones (low worker density) may activate at ≥2 peers; denser zones (high worker density) enforce ≥3–4.
```

### Geofencing Implementation

All zone logic uses **lat/lon** and **H3 hexagonal indexing** (Uber H3 library, resolution 8 = ~460m cells)

Every worker gets a deterministic, reproducible zone ID. Premium pricing, peer validation, and disruption triggers are all computed at this zone level.

---

## 💰 Weekly Premium Model

GigShield uses a **3-tier base pricing model** with AI-driven personalization. Premiums are weekly to match the gig worker's earnings cycle.

```
WEEKLY PREMIUM TIERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TIER 1 — SafeShield Basic         ₹29 / week
  ├── Coverage: ₹200/day income replacement
  ├── Max weekly payout: ₹1,000
  └── Triggers: Rainfall + Extreme Heat + Flood

  TIER 2 — SafeShield Pro           ₹59 / week
  ├── Coverage: ₹400/day income replacement
  ├── Max weekly payout: ₹2,000
  └── Triggers: All environmental + AQI

  TIER 3 — SafeShield Max           ₹99 / week
  ├── Coverage: ₹600/day income replacement
  ├── Max weekly payout: ₹3,500
  └── Triggers: All 5 categories including civic disruptions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Dynamic Premium Personalization (Random Forest Model)

The base tier price is adjusted by an **AI Premium Engine** — a Random Forest Regressor using exactly **3 features**:

```python
FEATURES = [
    "zone_risk_score",       # FROM Open-Meteo 5-year historical data
    "tenure_weeks",          # FROM platform Supabase(PostgreSQL) DB
    "season_enc",            # FROM calendar 
]

# RF adjustment factor is predicted dynamically by the trained model:
RF multiplier → predicted by Random Forest based on features
Final Weekly Premium = Base Tier Price × RF_adjustment_factor(features)
```

**Zone Risk Score Calculation:**
```
zone_risk_score = disruption_days / total_days  (5-year rolling window)
disruption_day  = 1 if rainfall_mm > 15 OR temp_c > 42  (per Open-Meteo)
                = 0 otherwise
Total days      = 365 × 5 years = 1,825 days per H3 zone
```

**Data sources for training:**
- `zone_risk_score` → Computed from Open-Meteo 5-year historical archive API (free, no key)
- `tenure_weeks` → Your own PostgreSQL worker registry
- `season_enc` → Calendar-derived: monsoon/summer/winter/post_monsoon per city

---

## 🧠 AI/ML Architecture

### Model Registry

| Model | Type | Input Features | Output | Purpose |
|---|---|---|---|---|
| **Premium Engine** | Random Forest Regressor | zone_risk_score, tenure_weeks, season_enc | Weekly premium multiplier | Personalized pricing |
| **GBDCM** | XGBoost Classifier | API signals + peer inactivity features | DSS ∈ [0,1] | Disruption confirmation |
| **Fraud Detector** | Isolation Forest + DBSCAN | Claim frequency, zone spike, movement, peer agreement | Fraud Risk Score ∈ [0,1] | Anomaly detection |


### System Data Flow

```
REAL-TIME PIPELINE (APScheduler, every 5 minutes)
  │
  ├─ Fetch: OpenWeatherMap + IMD RSS + AQICN + HERE Maps + NewsAPI
  │
  ├─ NLP Civic Classifier scores NewsAPI articles per city/district
  │
  ├─ GBDCM computes DSS per active H3 zone
  │
  ├─ If DSS crosses model-learned activation point for zone:
  │     → Identify all active policyholders in zone
  │     → Query peer inactivity count from DB
  │     → If dual-confirmation met → Claim candidate created
  │
  ├─ Fraud Detector scores each claim candidate → Fraud Risk Score
  │
  └─ Payout = (1 - Fraud_Risk) × DSS × income_baseline × tier
              → Razorpay Sandbox API initiated
              → Worker notified via SMS + in-app (Coqui TTS voice)
```

---

## 🛡️ Adversarial Defense & Anti-Spoofing Strategy

GigShield is designed to be resilient against coordinated fraud attempts such as GPS spoofing attacks. Instead of relying solely on device-reported location, the system uses a **multi-signal verification architecture** combining geospatial, behavioral, and network-level intelligence.

---

### 1. 🔍 Differentiation: Genuine Worker vs Spoofed Actor

We do not trust GPS alone. A claim is validated only when **multiple independent signals agree**:

#### ✅ Multi-Signal Consensus Model

A disruption is confirmed only if:

- Worker's H3 zone matches disruption zone
- External APIs confirm event (weather, AQI, traffic)
- Peer workers in same zone show similar inactivity
- Device/network signals align with claimed location

#### 🚫 Fraud Pattern

Spoofers typically:

- Show correct GPS but **no supporting signals**
- Have **normal network conditions** (no storm degradation)
- Lack **peer confirmation** from the zone

If signals mismatch → claim is flagged and routed to verification workflow.

---

### 2. 📊 Data Signals Used (Beyond GPS)

#### 📡 Network & Device Signals

- IP-based geolocation (coarse location cross-check)
- Network latency / jitter (poor in real disruptions, clean at home)
- Sudden GPS jumps (teleport detection via trajectory analysis)

#### 🗺️ Geospatial Consistency (Uber H3)

- Worker must remain within consistent H3 zone during claim window
- Neighbor zone validation (movement continuity check)
- Spoofed coordinates often lack natural path irregularity

#### 👥 Peer Validation

- Minimum N workers inactive in same H3 zone required
- Cluster-based anomaly detection (DBSCAN) on inactivity patterns
- Detects coordinated fraud rings: genuine disruptions spread organically across a zone; syndicate claims spike unnaturally fast

#### 🌐 External Ground Truth

- OpenWeatherMap (rain, heat)
- Central Pollution Control Board / AQICN (AQI)
- HERE Technologies (traffic slowdown as flood proxy)
- NewsAPI (curfew/bandh detection)

A payout is triggered only when **real-world signals confirm disruption** in the worker's specific geofenced zone.

---

### 3. 🧠 AI/ML-Based Fraud Detection

GigShield uses unsupervised anomaly detection models.

**Models used:**
- **Isolation Forest** — detects individual claims that are statistical outliers across all features
- **DBSCAN (Density-Based Clustering)** — detects coordinated fraud rings as abnormal claim clusters in space-time

**Features analyzed:**

```
claim_frequency_worker     → How often this worker claims
zone_claim_spike_score     → Abnormal claim volume in zone vs. historical
peer_agreement_score       → How many peers corroborate the disruption
gps_trajectory_smoothness  → Natural movement vs. scripted spoofed path
network_quality_delta      → Signal degradation vs. baseline
```

**Output:**
```
Fraud Risk Score ∈ [0, 1]
High-risk claims → flagged for verification workflow
Low-risk claims  → payout processed automatically
```

---

### 4. ⚖️ UX Balance: Fairness for Honest Workers

We avoid false rejections using a **graceful verification workflow**:

#### 🟡 Soft Flag (Low Confidence)

- Temporary delay (5–10 minutes)
- System re-checks external signals automatically
- Worker receives passive in-app ping — no manual action needed

#### 🔴 Hard Flag (High Risk)

- Claim held in escrow
- System requires background location continuity + network consistency check
- Human review triggered if signals remain inconsistent after 2 hours

#### 🟢 Honest Worker Protection

- If disruption is confirmed by subsequent API checks → payout processed automatically, no worker action needed
- No permanent penalty for temporary flags caused by network drops
- Workers with long tenure and zone loyalty get lower Fraud Risk Scores — the model learns this credibility signal from data

---

### 5. 🛡️ Anti-Collusion Detection

To prevent large-scale fraud rings:

- Detect **sudden spike of claims in low-risk zones** (zone_risk_score vs. claim rate mismatch)
- Cross-check claim timing: genuine disruptions accumulate over 45–90 mins; ring attacks spike in < 15 mins
- DBSCAN identifies synchronized claim clusters as a learned spatial-temporal anomaly — no hard-coded rule

---

## 🚀 Novelty & Uniqueness

These are original innovations that go beyond the problem brief. No existing insurtech in India offers any of them.

### 1. Disruption Severity Score (DSS) — Graduated ML Payouts
GBDCM outputs a continuous DSS enabling **proportional payouts** — a worker in mild drizzle gets less than one in a full flood. No binary on/off trigger.

### 2. Peer Validation as Ground Truth
Worker inactivity in a geofenced zone requires no third-party API. It simultaneously confirms disruption AND prevents fraud — the most cost-effective and tamper-resistant validation layer possible.

### 3. Isolation Forest + DBSCAN Fraud Detection
Unsupervised anomaly detection requires no labeled fraud data to start. DBSCAN specifically targets syndicate ring patterns by identifying abnormal claim clusters in space and time.

### 4. Hyperlocal H3 Zone Pricing (500m Grid)
Premium pricing at Uber H3 resolution 8 (~460m cells). A worker in a flood-prone lane pays more than one 800m away on elevated ground — sub-PIN-code fairness no existing insurer offers.

### 5. Income Smoothing Savings Pod
2% of every weekly premium accumulates in a worker-controlled savings vault. Four consecutive claim-free weeks returns it as a "Good Weather Bonus" — solving the *"why am I paying if nothing happened?"* retention problem.

### 6. Vernacular Voice UX via Coqui TTS / eSpeak NG
Complete onboarding and claim notifications delivered in voice across 5 regional languages using **open-source, self-hosted TTS** (Coqui TTS for high quality, eSpeak NG as fallback) 

---

## 🛠️ Tech Stack

```yaml
Frontend:
  - React.js (PWA — installable on Android, offline-capable)
  - Tailwind CSS
  - Web Speech API (browser-based STT for voice input)
  - Service Workers (offline support for low-connectivity users)

Backend:
  - FastAPI (Python) — Core REST API server
  - APScheduler — Lightweight in-process scheduler for monitoring pipeline
  - Supabase/PostgreSQL — Transactional data (policies, claims, payouts, worker registry)
  - SQLite — Local development / lightweight fallback

AI/ML:
  - XGBoost — GBDCM (Disruption Severity Score)
  - scikit-learn (Random Forest) — Premium Engine
  - scikit-learn (Isolation Forest) — Fraud anomaly detection
  - scikit-learn (DBSCAN) — Coordinated ring detection

Voice / Language:
  - Coqui TTS (XTTS-v2) — Offline synthesis with fine-tuning support for Tamil/Hindi
  - eSpeak NG — Production-ready fallback TTS for Tamil/Hindi/Telugu, fully offline
  - Web Speech API — Browser-based speech-to-text for voice onboarding

Real Data Integrations:
  - OpenWeatherMap API (live weather triggers)
  - Open-Meteo API (historical weather for training — free, no key)
  - IMD RSS feed (official weather alerts)
  - CPCB / AQICN API (air quality triggers)
  - HERE Maps Traffic API (flood proxy via congestion data)
  - NewsAPI.org (civic disruption detection)
  - Razorpay Sandbox (payment simulation)
  - Uber H3 Python library (geofencing)

Infrastructure:
  - GitHub Actions — CI/CD pipeline
```

---

## 📊 Dashboard Design

### Worker Dashboard (Mobile PWA)

```
┌─────────────────────────────────────────┐
│  👋 Hello Ramesh!         [Englishl ▼]     │
│  📍 Ambattur — Zone H3:8a3f2d1b        │
│─────────────────────────────────────────│
│  🟢 Coverage ACTIVE — SafeShield Pro    │
│  Expires: Sunday | Premium Paid: ₹71   │
│─────────────────────────────────────────│
│  🌡️ Zone Disruption Risk Today          │
│  DSS: 0.31 — LOW RISK                  │
│─────────────────────────────────────────│
│  💰 This Month                          │
│  Earnings Protected: ₹1,200            │
│  Payouts Received: ₹800                │
│  Savings Pod Balance: ₹12.40           │
│─────────────────────────────────────────│
│  📅 Risk Calendar — This Week           │
│  Mon ▪ Tue ▪ Wed 🌧️ 68% Thu ▪ Fri ▪  │
│─────────────────────────────────────────│
│  [Renew Coverage]  [Claim History]      │
└─────────────────────────────────────────┘
```

### Admin / Insurer Dashboard
- Live DSS heatmap across all active H3 zones (city-wide view)
- Active policies count + weekly premium collected
- Claims triggered today — auto-approved vs. escrowed vs. in review
- Fraud queue: Isolation Forest flagged claims pending human review
- Loss ratio per zone per week
- DBSCAN ring alerts: newly detected abnormal claim clusters

---


## 👥 Team

---

## 👥 Team

| Member | Role |
|---|---|
| Kesavamurthy T | Product & AI Lead |
| Ramamuthukumaran S | Backend (FastAPI + ML Pipeline) |
| Rahul Jahannathan K | Frontend (React PWA + Voice) |
| T P Sutharsan | Data & ML (Models + Analytics) |

**Repository:** [GitHub — https://github.com/srmk-2005/gigshield.git](https://github.com/srmk-2005/gigshield.git)

**Demo Video Phase 1:** [YouTube — 5-minute overview](https://youtube.com/shorts/5d7wYNrR2LE?si=mjO3Epe9MmhuhsDK)

---

> *Built with ❤️ for India's 5 million invisible delivery heroes.*
> 
> *GigShield — Because disruptions shouldn't mean devastation.*
