import Link from "next/link";
import { Shield, ExternalLink, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#050a17] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-sm">CyberLaw Atlas</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Global Cybercrime & Cyber Legislation Intelligence Platform. Meticulously cataloging criminal codes, statutes, and penalties across sovereign jurisdictions.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Verified Primary Government Sources</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Intelligence
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/crimes" className="hover:text-blue-400 transition-colors">
                  Cybercrime Library
                </Link>
              </li>
              <li>
                <Link href="/countries" className="hover:text-blue-400 transition-colors">
                  Jurisdictions & Profiles
                </Link>
              </li>
              <li>
                <Link href="/legislation" className="hover:text-blue-400 transition-colors">
                  Legislation Database
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-blue-400 transition-colors">
                  Cross-Border Comparison
                </Link>
              </li>
              <li>
                <Link href="/ai-crimes" className="hover:text-blue-400 transition-colors">
                  AI & Emerging Crimes
                </Link>
              </li>
            </ul>
          </div>

          {/* Primary Legal Sources */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Authoritative Sources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.meity.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center space-x-1"
                >
                  <span>MeitY & India Code</span>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://uscode.house.gov"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center space-x-1"
                >
                  <span>US Code Title 18</span>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.legislation.gov.uk"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center space-x-1"
                >
                  <span>UK Legislation (gov.uk)</span>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://sso.agc.gov.sg"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center space-x-1"
                >
                  <span>Singapore Statutes Online</span>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Educational Disclaimer */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Legal Disclaimer
            </h4>
            <div className="p-3 rounded border border-slate-800 bg-slate-900/60 text-[11px] leading-relaxed text-slate-400">
              CyberLaw Atlas is an educational and legal-tech research instrument. Information provided herein is compiled from primary statutory records and does not constitute formal legal counsel. For specific legal proceedings, consult qualified legal practitioners in the relevant jurisdiction.
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} CyberLaw Atlas. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link href="/timeline" className="hover:text-slate-300">
              Legislative Timeline
            </Link>
            <Link href="/research" className="hover:text-slate-300">
              AI Research Assistant
            </Link>
            <Link href="/admin" className="hover:text-slate-300">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
