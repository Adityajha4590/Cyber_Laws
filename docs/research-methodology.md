# CyberLaw Atlas — Research & Verification Methodology

## 1. Research Principles
Legal intelligence platforms must enforce strict standards of verification:
1. **No Legal Hallucination**: The system never invents a section number, statute, fine amount, imprisonment term, or court ruling.
2. **Authority Hierarchy**: Primary sovereign gazettes take precedence over secondary commentary or media summaries.
3. **Statutory Status Clarity**: Distinguishes enacted laws from laws in force, and identifies proposed bills and legal gaps.

---

## 2. Source Classification & Hierarchy

| Tier | Category | Reliability Level | Examples |
|---|---|---|---|
| **Tier 1** | Primary Official | `PRIMARY_OFFICIAL` | Official Gazette of India, US Code Title 18, UK Legislation (legislation.gov.uk), Singapore Statutes Online |
| **Tier 2** | Government & Ministries | `GOVERNMENT` | MeitY, US Department of Justice CCIPS, UK National Cyber Security Centre, Singapore CSA |
| **Tier 3** | Courts & Judiciary | `COURT` | Supreme Court of India, Supreme Court of the United States, High Court of England & Wales |
| **Tier 4** | Regulators | `REGULATOR` | CERT-In, CISA, FTC, ICO |
| **Tier 5** | Academic & Secondary | `SECONDARY_LEGAL` | Peer-reviewed legal journals, university cyber law centers |

---

## 3. Statutory Verification States

Every record in the database carries an audited verification lifecycle:
1. `UNVERIFIED`: Information entered without primary citation.
2. `AI_RESEARCHED`: Information retrieved through external AI research pipelines awaiting review.
3. `SOURCE_VERIFIED`: Corroborated against an official government gazette or legislative repository URL.
4. `HUMAN_REVIEWED`: Verified by a qualified legal-tech analyst.
5. `PUBLISHED`: Deployed to the public intelligence catalog.
6. `NEEDS_UPDATE`: Flagged for review due to legislative amendments.

---

## 4. Legal Gaps Identification Criteria
A legal gap is declared **only** when:
- Authoritative statutory definitions of criminal modalities fail to encompass the specific technological vector (e.g. generative neural audio synthesis without deceptive human impersonation).
- Judicial precedent confirms existing statutes do not extend to the conduct (e.g. *Van Buren v. United States* restricting CFAA scope).
- Missing search results are **never** treated as proof that an offence does not exist.
