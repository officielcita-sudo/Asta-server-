// Removal Center resources. Each item: id, title, note, url, regions.
// Regions: global, us, eu, uk, fr, ma, ca, br. Loaded by the browser
// (window.REMOVAL) and by the tests (module.exports).
(function (root) {
  const REGIONS = [
    { id: 'all', label: 'Show everything' },
    { id: 'us', label: 'United States', includes: ['global', 'us'] },
    { id: 'eu', label: 'European Union', includes: ['global', 'eu'] },
    { id: 'fr', label: 'France', includes: ['global', 'eu', 'fr'] },
    { id: 'uk', label: 'United Kingdom', includes: ['global', 'uk'] },
    { id: 'ma', label: 'Morocco', includes: ['global', 'ma'] },
    { id: 'ca', label: 'Canada', includes: ['global', 'ca'] },
    { id: 'br', label: 'Brazil', includes: ['global', 'br'] },
  ];

  const SECTIONS = [
    {
      id: 'secure',
      title: 'Secure your accounts',
      intro: 'Do this first. If your passwords leaked, especially through password-stealing malware, attackers may still be signed in. Clean your devices, then change passwords and sign out every session.',
      items: [
        { id: 'scan-device', title: 'Scan your computer and phone for malware', regions: ['global'],
          url: 'https://www.malwarebytes.com/mwb-download',
          note: 'Run a full scan (Malwarebytes Free, or Windows Security → Virus & threat protection → Full scan). If malware stole your logins, new passwords can be stolen too until it is removed.' },
        { id: 'google-checkup', title: 'Google Security Checkup', regions: ['global'],
          url: 'https://myaccount.google.com/security-checkup',
          note: 'Review recovery options, third-party access and recent security events for your Google account.' },
        { id: 'google-devices', title: 'Sign out unknown Google devices', regions: ['global'],
          url: 'https://myaccount.google.com/device-activity',
          note: 'A stolen session keeps working after a password change. Sign out every device you don’t recognize.' },
        { id: 'microsoft', title: 'Microsoft account security', regions: ['global'],
          url: 'https://account.microsoft.com/security',
          note: 'Change your password, check sign-in activity and sign out everywhere (Outlook, Hotmail, Xbox, Windows).' },
        { id: 'apple', title: 'Apple Account devices', regions: ['global'],
          url: 'https://account.apple.com/',
          note: 'Check the device list and remove anything you don’t own.' },
        { id: 'meta', title: 'Facebook and Instagram security', regions: ['global'],
          url: 'https://accountscenter.facebook.com/password_and_security',
          note: 'Change your password, review “Where you’re logged in” and turn on two-factor authentication.' },
        { id: 'password-manager', title: 'Move to a password manager', regions: ['global'],
          url: 'https://bitwarden.com/',
          note: 'Bitwarden is free and open source. Give every site its own password so one leak can’t unlock the rest.' },
        { id: 'two-factor', title: 'Turn on two-factor login everywhere', regions: ['global'],
          url: 'https://2fa.directory/',
          note: 'This directory lists which sites support two-factor login and links to each setup page. Prefer an authenticator app over SMS.' },
      ],
    },
    {
      id: 'search',
      title: 'Remove yourself from search engines',
      intro: 'Search engines can hide pages that expose your contact details. This removes the link from results, not the page itself, so pair it with the data broker steps below.',
      items: [
        { id: 'google-rau', title: 'Google “Results about you”', regions: ['global'],
          url: 'https://myactivity.google.com/results-about-you',
          note: 'Tell Google your phone, email and address. It alerts you when they appear in results and lets you request removal in a few taps.' },
        { id: 'google-personal', title: 'Google personal information removal', regions: ['global'],
          url: 'https://support.google.com/websearch/answer/9673730',
          note: 'Request removal of doxxing content, ID numbers, bank details, login credentials and explicit images shared without consent.' },
        { id: 'google-rtbf', title: 'Google “right to be forgotten” form', regions: ['eu', 'uk'],
          url: 'https://reportcontent.google.com/forms/rtbf',
          note: 'EU and UK residents can ask Google to delist outdated or irrelevant pages about them under data protection law.' },
        { id: 'bing-rtbf', title: 'Bing privacy removal form', regions: ['eu', 'uk'],
          url: 'https://www.bing.com/webmaster/tools/eu-privacy-request',
          note: 'The same right for Microsoft Bing, which also powers DuckDuckGo and Yahoo results.' },
        { id: 'google-outdated', title: 'Remove outdated Google results', regions: ['global'],
          url: 'https://search.google.com/search-console/remove-outdated-content',
          note: 'If a site already deleted your information but Google still shows the old snippet, request a refresh here.' },
        { id: 'bing-outdated', title: 'Remove outdated Bing results', regions: ['global'],
          url: 'https://www.bing.com/webmaster/tools/contentremoval',
          note: 'Ask Bing to drop pages or cached copies that no longer exist.' },
      ],
    },
    {
      id: 'brokers',
      title: 'Opt out of data brokers',
      intro: 'People-search sites sell profiles with your address, phone and relatives. Start with the starred sites; one opt-out sometimes covers several sister sites.',
      items: [
        { id: 'ca-drop', title: 'California DROP: one request to every broker', priority: true, regions: ['us'],
          url: 'https://privacy.ca.gov/drop/',
          note: 'California residents: one free request that every registered data broker must honor, checked every 45 days.' },
        { id: 'spokeo', title: 'Spokeo', priority: true, regions: ['us'], url: 'https://www.spokeo.com/optout',
          note: 'Find your listing, paste its URL, confirm by email.' },
        { id: 'whitepages', title: 'Whitepages', priority: true, regions: ['us'], url: 'https://www.whitepages.com/suppression-requests',
          note: 'Paste your profile URL; confirmation is by phone call.' },
        { id: 'beenverified', title: 'BeenVerified', priority: true, regions: ['us'], url: 'https://www.beenverified.com/app/optout/search',
          note: 'One request also covers its sister sites.' },
        { id: 'peopleconnect', title: 'Intelius / PeopleConnect', priority: true, regions: ['us'], url: 'https://suppression.peopleconnect.us/login',
          note: 'Covers Intelius, TruthFinder, Instant Checkmate and US Search.' },
        { id: 'truepeoplesearch', title: 'TruePeopleSearch', priority: true, regions: ['us'], url: 'https://www.truepeoplesearch.com/removal',
          note: 'Search yourself, then remove each matching record.' },
        { id: 'fastpeoplesearch', title: 'FastPeopleSearch', priority: true, regions: ['us'], url: 'https://www.fastpeoplesearch.com/removal',
          note: 'Search yourself, then remove each matching record.' },
        { id: 'radaris', title: 'Radaris', priority: true, regions: ['us'], url: 'https://radaris.com/control/privacy',
          note: 'Requires a free account to hide or remove your profile.' },
        { id: 'peoplefinders', title: 'PeopleFinders', regions: ['us'], url: 'https://www.peoplefinders.com/opt-out',
          note: 'Opt-out form with email confirmation.' },
        { id: 'mylife', title: 'MyLife', regions: ['us'], url: 'https://www.mylife.com/ccpa/index.pubview',
          note: 'Uses a CCPA form that also works for non-California residents.' },
        { id: 'nuwber', title: 'Nuwber', regions: ['us'], url: 'https://nuwber.com/removal/link',
          note: 'Paste your profile URL and confirm by email.' },
        { id: 'thatsthem', title: 'ThatsThem', regions: ['us'], url: 'https://thatsthem.com/optout',
          note: 'Simple opt-out form.' },
        { id: 'peekyou', title: 'PeekYou', regions: ['us'], url: 'https://www.peekyou.com/about/contact/optout',
          note: 'Paste your profile link into the form.' },
        { id: 'acxiom', title: 'Acxiom (marketing data)', regions: ['us', 'eu', 'uk'], url: 'https://isapps.acxiom.com/optout/optout.aspx',
          note: 'One of the largest marketing data brokers worldwide.' },
        { id: 'epsilon', title: 'Epsilon (marketing data)', regions: ['us', 'eu', 'uk'], url: 'https://legal.epsilon.com/dsr/',
          note: 'Request portal for access and deletion.' },
        { id: 'badbool', title: 'More brokers: the community opt-out list', regions: ['global'],
          url: 'https://github.com/yaelwrites/Big-Ass-Data-Broker-Opt-Out-List',
          note: 'A volunteer-maintained list of hundreds of brokers with opt-out instructions, updated as sites change.' },
      ],
    },
    {
      id: 'marketing',
      title: 'Stop marketing, calls and junk mail',
      intro: 'Leaked contact details end up on marketing lists. These official registries cut the volume of calls, letters and offers.',
      items: [
        { id: 'optoutprescreen', title: 'Stop pre-approved credit offers', regions: ['us'], url: 'https://www.optoutprescreen.com/',
          note: 'The credit bureaus’ official opt-out: 5 years online, or permanent by mail.' },
        { id: 'dmachoice', title: 'DMAchoice', regions: ['us'], url: 'https://www.dmachoice.org/',
          note: 'Reduce catalogs, magazine offers and other direct mail.' },
        { id: 'donotcall', title: 'National Do Not Call Registry', regions: ['us'], url: 'https://www.donotcall.gov/',
          note: 'Register your numbers and report unwanted sales calls.' },
        { id: 'tps', title: 'Telephone Preference Service', regions: ['uk'], url: 'https://www.tpsonline.org.uk/',
          note: 'The UK’s official opt-out from sales calls.' },
        { id: 'signalconso', title: 'Report unwanted sales calls (SignalConso)', regions: ['fr'], url: 'https://signal.conso.gouv.fr/',
          note: 'Since August 2026, French businesses need your prior consent to cold-call you. Report calls you never agreed to.' },
        { id: 'dncl-ca', title: 'National Do Not Call List (Canada)', regions: ['ca'], url: 'https://lnnte-dncl.gc.ca/',
          note: 'Register your home and mobile numbers to cut telemarketing calls, and file complaints.' },
        { id: 'naomeperturbe', title: 'Não Me Perturbe (Brazil)', regions: ['br'], url: 'https://www.naomeperturbe.com.br/',
          note: 'Block telemarketing calls from phone companies and banks.' },
        { id: 'unsubscribe', title: 'Block senders and unsubscribe in Gmail', regions: ['global'], url: 'https://support.google.com/mail/answer/8151',
          note: 'Use the Unsubscribe button for legitimate senders and Block for persistent ones. Mark scams as spam instead of clicking their links.' },
      ],
    },
    {
      id: 'protect',
      title: 'Protect yourself from here on',
      intro: 'Make the next leak matter less.',
      items: [
        { id: 'simplelogin', title: 'Email aliases with SimpleLogin', regions: ['global'], url: 'https://simplelogin.io/',
          note: 'Sign up to sites with a different forwarding address each time. If one leaks, delete just that alias.' },
        { id: 'relay', title: 'Firefox Relay', regions: ['global'], url: 'https://relay.firefox.com/',
          note: 'Free email masks from Mozilla.' },
        { id: 'ddg-email', title: 'DuckDuckGo Email Protection', regions: ['global'], url: 'https://duckduckgo.com/email/',
          note: 'Free @duck.com addresses that also strip email trackers.' },
        { id: 'freeze-equifax', title: 'Credit freeze: Equifax', regions: ['us'], url: 'https://www.equifax.com/personal/credit-report-services/credit-freeze/',
          note: 'Free. Stops new credit accounts being opened in your name.' },
        { id: 'freeze-experian', title: 'Credit freeze: Experian', regions: ['us'], url: 'https://www.experian.com/freeze/center.html',
          note: 'Free. Freeze all three bureaus for full protection.' },
        { id: 'freeze-transunion', title: 'Credit freeze: TransUnion', regions: ['us'], url: 'https://www.transunion.com/credit-freeze',
          note: 'Free. You can lift it temporarily when you apply for credit.' },
        { id: 'idtheft-us', title: 'Identity theft recovery plan', regions: ['us'], url: 'https://www.identitytheft.gov/',
          note: 'The FTC’s official step-by-step plan if someone used your identity.' },
        { id: 'cybermalveillance', title: 'Cybermalveillance.gouv.fr', regions: ['fr'], url: 'https://www.cybermalveillance.gouv.fr/',
          note: 'France’s official help service for hacked accounts, scams and identity theft.' },
        { id: 'actionfraud', title: 'Action Fraud', regions: ['uk'], url: 'https://www.actionfraud.police.uk/',
          note: 'Report fraud and cybercrime in England, Wales and Northern Ireland.' },
        { id: 'antifraud-ca', title: 'Canadian Anti-Fraud Centre', regions: ['ca'], url: 'https://antifraudcentre-centreantifraude.ca/',
          note: 'Report fraud and identity theft in Canada and get recovery steps.' },
        { id: 'dgssi', title: 'DGSSI / maCERT (Morocco)', regions: ['ma'], url: 'https://www.dgssi.gov.ma/',
          note: 'Morocco’s national cybersecurity authority: security alerts, advice and incident reporting.' },
        { id: 'dpa-cnil', title: 'Complain to the CNIL if a company ignores you', regions: ['fr'], url: 'https://www.cnil.fr/fr/plaintes',
          note: 'France’s data protection authority handles complaints when a company refuses or ignores your deletion request.' },
        { id: 'dpa-ico', title: 'Complain to the ICO if a company ignores you', regions: ['uk'], url: 'https://ico.org.uk/make-a-complaint/',
          note: 'The UK regulator for data protection complaints.' },
        { id: 'dpa-cndp', title: 'Know your rights with the CNDP', regions: ['ma'], url: 'https://www.cndp.ma/',
          note: 'Morocco’s data protection commission explains your rights under Law 09-08 and receives complaints.' },
        { id: 'dpa-opc', title: 'Office of the Privacy Commissioner of Canada', regions: ['ca'], url: 'https://www.priv.gc.ca/en/report-a-concern/',
          note: 'File a privacy complaint when an organization mishandles or refuses to delete your data.' },
        { id: 'dpa-anpd', title: 'ANPD (Brazil)', regions: ['br'], url: 'https://www.gov.br/anpd/pt-br',
          note: 'Brazil’s data protection authority receives complaints under the LGPD.' },
        { id: 'delete-old', title: 'Delete accounts you no longer use', regions: ['global'], url: 'https://justdeleteme.xyz/',
          note: 'A directory of direct links for deleting accounts on hundreds of services. Fewer accounts, fewer future leaks.' },
      ],
    },
    {
      id: 'sensitive',
      title: 'Intimate images shared without consent',
      intro: 'If private images of you were shared or threatened to be shared, these free services help block them across major platforms, without anyone seeing the images.',
      items: [
        { id: 'stopncii', title: 'StopNCII.org (adults)', regions: ['global'], url: 'https://stopncii.org/',
          note: 'Creates a digital fingerprint on your device so partner platforms can block the images. The images never leave your device.' },
        { id: 'takeitdown', title: 'Take It Down (under 18)', regions: ['global'], url: 'https://takeitdown.ncmec.org/',
          note: 'For images taken when you were under 18. Free and anonymous.' },
      ],
    },
  ];

  // Legal request letters: laws, deadlines and regulators.
  const LAWS = {
    gdpr: {
      label: 'GDPR (European Union)', region: 'eu',
      regulator: { name: 'your national data protection authority', url: 'https://www.edpb.europa.eu/about-edpb/about-edpb/members_en' },
      followUp: { delete: 30, access: 30, optout: 30 },
      deadline: 'Please respond without undue delay and in any event within one month of receiving this request, as required by Article 12(3) GDPR.',
      basis: {
        delete: 'Under Article 17 of the General Data Protection Regulation (GDPR), I request the erasure of all personal data you hold about me. Under Article 21(3), I also object to any processing of my data for direct marketing.',
        access: 'Under Article 15 of the General Data Protection Regulation (GDPR), I request a copy of all personal data you hold about me, together with the purposes of processing, the recipients it was shared with, how long it will be kept and where it was obtained.',
        optout: 'Under Article 21 of the General Data Protection Regulation (GDPR), I object to the processing of my personal data for direct marketing, including profiling, and ask you to stop sharing it with third parties.',
      },
    },
    ukgdpr: {
      label: 'UK GDPR (United Kingdom)', region: 'uk',
      regulator: { name: 'the Information Commissioner’s Office (ICO)', url: 'https://ico.org.uk/make-a-complaint/' },
      followUp: { delete: 30, access: 30, optout: 30 },
      deadline: 'Please respond within one month of receiving this request, as required by the UK GDPR.',
      basis: {
        delete: 'Under Article 17 of the UK General Data Protection Regulation, I request the erasure of all personal data you hold about me. Under Article 21(3), I also object to any processing of my data for direct marketing.',
        access: 'Under Article 15 of the UK General Data Protection Regulation, I request a copy of all personal data you hold about me, together with the purposes of processing, the recipients, the retention period and the source of the data.',
        optout: 'Under Article 21 of the UK General Data Protection Regulation, I object to the processing of my personal data for direct marketing, including profiling, and ask you to stop sharing it with third parties.',
      },
    },
    ccpa: {
      label: 'CCPA / CPRA (California)', region: 'us',
      regulator: { name: 'the California Privacy Protection Agency', url: 'https://cppa.ca.gov/webapplications/complaint' },
      followUp: { delete: 45, access: 45, optout: 21 },
      deadline: {
        delete: 'Please confirm the deletion within 45 days of receiving this request, as required by the CCPA.',
        access: 'Please respond within 45 days of receiving this request, as required by the CCPA.',
        optout: 'Please comply as soon as possible and no later than 15 business days after receiving this request, as required by the CCPA regulations.',
      },
      basis: {
        delete: 'Under the California Consumer Privacy Act (Cal. Civ. Code § 1798.105), I request that you delete all personal information you have collected about me and direct your service providers and contractors to do the same.',
        access: 'Under the California Consumer Privacy Act (Cal. Civ. Code §§ 1798.110 and 1798.115), I request to know the categories and specific pieces of personal information you have collected about me, the sources, the purposes, and the third parties you have sold or shared it with.',
        optout: 'Under the California Consumer Privacy Act (Cal. Civ. Code § 1798.120), I direct you not to sell or share my personal information, and to notify any third parties you sold or shared it with in the past 90 days.',
      },
    },
    usstate: {
      label: 'Other US state privacy laws', region: 'us',
      regulator: { name: 'your state attorney general', url: 'https://www.naag.org/find-my-ag/' },
      followUp: { delete: 45, access: 45, optout: 45 },
      deadline: 'Please respond within 45 days of receiving this request, as required by state consumer privacy laws.',
      basis: {
        delete: 'Under the consumer privacy law of my state of residence (for example the Virginia, Colorado, Connecticut, Texas or Oregon consumer data protection acts), I request that you delete all personal data you have collected about me.',
        access: 'Under the consumer privacy law of my state of residence (for example the Virginia, Colorado, Connecticut, Texas or Oregon consumer data protection acts), I request confirmation of whether you process my personal data and a copy of that data.',
        optout: 'Under the consumer privacy law of my state of residence (for example the Virginia, Colorado, Connecticut, Texas or Oregon consumer data protection acts), I opt out of the sale of my personal data, targeted advertising and profiling.',
      },
    },
    pipeda: {
      label: 'PIPEDA (Canada)', region: 'ca',
      regulator: { name: 'the Office of the Privacy Commissioner of Canada', url: 'https://www.priv.gc.ca/en/report-a-concern/' },
      followUp: { delete: 30, access: 30, optout: 30 },
      deadline: 'Please respond within 30 days of receiving this request, as PIPEDA requires for access requests.',
      basis: {
        delete: 'Under the Personal Information Protection and Electronic Documents Act (PIPEDA), I withdraw my consent to your collection, use and disclosure of my personal information (Principle 4.3.8) and ask you to destroy or erase the personal information you no longer need (Principle 4.5.3).',
        access: 'Under the Personal Information Protection and Electronic Documents Act (PIPEDA), Principle 4.9, I request access to all personal information you hold about me and an account of how it has been used and disclosed.',
        optout: 'Under the Personal Information Protection and Electronic Documents Act (PIPEDA), Principle 4.3.8, I withdraw my consent to the use and disclosure of my personal information for marketing purposes.',
      },
    },
    lgpd: {
      label: 'LGPD (Brazil)', region: 'br',
      regulator: { name: 'the National Data Protection Authority (ANPD)', url: 'https://www.gov.br/anpd/pt-br' },
      followUp: { delete: 15, access: 15, optout: 15 },
      deadline: 'Please respond within 15 days of receiving this request.',
      basis: {
        delete: 'Under Article 18 of the Brazilian General Data Protection Law (LGPD, Law No. 13,709/2018), I request the elimination of my personal data processed with my consent (item VI) and the anonymization, blocking or elimination of any unnecessary or excessive data (item IV).',
        access: 'Under Articles 18 and 19 of the Brazilian General Data Protection Law (LGPD, Law No. 13,709/2018), I request confirmation that you process my personal data and full access to that data.',
        optout: 'Under Article 18, item IX, of the Brazilian General Data Protection Law (LGPD, Law No. 13,709/2018), I revoke my consent to the processing of my personal data for marketing and its sharing with third parties.',
      },
    },
    ma: {
      label: 'Law 09-08 (Morocco)', region: 'ma',
      regulator: { name: 'the CNDP', url: 'https://www.cndp.ma/' },
      followUp: { delete: 30, access: 30, optout: 30 },
      deadline: 'Please respond within the time limits set by Law No. 09-08.',
      basis: {
        delete: 'Under Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data, I exercise my right to have my personal data erased and my right to object to its processing.',
        access: 'Under Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data, I exercise my right of access to all personal data you hold about me.',
        optout: 'Under Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data, I object to the use of my personal data for direct marketing and to its sharing with third parties.',
      },
    },
  };

  const REQUEST_TYPES = {
    delete: { label: 'Delete my data', subject: 'Request to delete my personal data' },
    access: { label: 'Get a copy of my data', subject: 'Request for access to my personal data' },
    optout: { label: 'Stop selling / marketing', subject: 'Objection to marketing and sale of my personal data' },
  };

  function buildLetter({ law, type, company, name, email, date }) {
    const L = LAWS[law];
    const T = REQUEST_TYPES[type];
    if (!L || !T) throw new Error('Unknown law or request type');
    const deadline = typeof L.deadline === 'string' ? L.deadline : L.deadline[type];
    const extra = type === 'access'
      ? '- tell me the categories of personal data you hold and who you shared them with;\n- provide the data in a commonly used electronic format.'
      : '- confirm which categories of my personal data you held and who you shared them with;\n- stop any sale or sharing of my personal data;\n- tell me if you cannot act on any part of this request, and the legal reason why.';
    const subject = `${T.subject} — ${L.label}`;
    const body = `To the Data Protection / Privacy team at ${company || '[Company name]'},

${date}

${L.basis[type]}

My account or records with you are associated with this email address: ${email || '[Your email address]'}

Please also:
${extra}

${deadline}

Kind regards,
${name || '[Your full name]'}
${email || '[Your email address]'}`;
    return { subject, body };
  }

  // Adds n days, or n business days when business is true.
  function addDays(start, n, business = false) {
    const d = new Date(start);
    if (!business) { d.setDate(d.getDate() + n); return d; }
    let left = n;
    while (left > 0) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0 && d.getDay() !== 6) left--; }
    return d;
  }

  function dueDate(law, type, sent) {
    if (law === 'ccpa' && type === 'optout') return addDays(sent, 15, true);
    return addDays(sent, LAWS[law].followUp[type]);
  }

  const api = { REGIONS, SECTIONS, LAWS, REQUEST_TYPES, buildLetter, dueDate, addDays };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.REMOVAL = api;
})(typeof window !== 'undefined' ? window : globalThis);
