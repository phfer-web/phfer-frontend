'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'English' | 'Português (PT-BR)';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    'English': {
        // ... (existing translations)

        // Projects
        'projects.kardio.title': '@kardiosoftware',
        'projects.kardio.short': 'Minimalist collaborative Kanban web app for teams and personal use.',
        'projects.kardio.full': 'A web application designed to simplify task management through a streamlined Kanban interface. It supports real-time collaboration, allowing teams to stay in sync effortlessly.',
        'projects.kardio.about': 'Developed with a focus on ease of use and speed, @kardiosoftware provides a clean workspace for individual or team projects, ensuring that nothing gets in the way of productivity.',

        'projects.dentioo.title': 'Dentioo',
        'projects.dentioo.short': 'Micro-SaaS for dental clinic management and automated patient care.',
        'projects.dentioo.full': 'A comprehensive management platform tailored for dentists. Features include scheduling, automated PDF medical records, and Google Drive integration for storage.',
        'projects.dentioo.about': 'Dentioo solves the administrative burden of dental clinics with features like patient history, automated quotes, and a super admin panel for subscription and trial management.',

        'projects.aura.title': 'Aura Air',
        'projects.aura.short': 'Environmental monitoring app developed for NASA Space Apps Hackathon to track real-time air quality.',
        'projects.aura.full': 'Aura Air was developed during the NASA Space Apps Hackathon in Uberlândia by a team of 4 from the University of Uberaba. The app leverages NASA atmospheric data and Google Maps API to help users visualize and navigate paths based on real-time air quality.',
        'projects.aura.about': 'Designed to address global environmental challenges, Aura Air allows users to create accounts, view air quality alerts, and choose healthier routes. This is particularly beneficial for users with respiratory conditions, providing real-time risk assessments and path optimizations.',

        'projects.mvc.title': 'MVC User Management',
        'projects.mvc.short': '.NET MVC system built with C#, OOP principles and MySQL for secure user management.',
        'projects.mvc.full': 'A robust user management application built with the Model-View-Controller pattern. Securely handles user data with a dedicated MySQL backend, emphasizing clean architecture.',
        'projects.mvc.about': 'This project showcases advanced Object-Oriented Programming (OOP) principles in C#, ensuring a highly maintainable and scalable codebase for enterprise-level user management.',
        // Navbar
        'nav.home': 'Home',
        'nav.work': 'Work',
        'nav.about': 'About',
        'nav.back': 'Back to Home',
        'nav.say_hello': 'Say Hello',

        // Home
        'home.hero.title': 'Software Developer',
        'home.hero.subtitle': 'Junior',
        'home.hero.description': "Hi, I'm Pedro. I'm a Backend Software Developer dedicated to building innovative, scalable, and high-performance solutions for both mobile and web applications, specializing in C#.",
        'home.hero.cv': 'Virtual CV',
        'home.hero.works': 'Works',

        // Work
        'work.title': 'Selected Work',
        'work.description': 'These are some of my featured projects. You can explore more of my work on my GitHub. Beyond these, I have professional experience developing custom enterprise systems, including ticket management, demand control, proposal generators, custom DREs, cash flow systems, and other tailored business solutions.',
        'work.see_details': 'See Details',
        'work.modal.technologies': 'Technologies',
        'work.modal.about': 'About the Project',
        'work.modal.github': 'GitHub Repo',
        'work.modal.demo': 'Live Demo',
        'work.modal.close': 'Close details',

        // About
        'about.title': 'About Me',
        'about.p1': "I'm Pedro Henrique Ferreira Fonseca. Technology has fascinated me since I was young.",
        'about.p2': "In 2015, I began exploring this universe more deeply through online games, forums, and downloading music—just like many others at the time. I never took formal IT courses back then, but people would always ask if I had, because I seemed to master everything naturally.",
        'about.p3': 'It was in Habbo Hotel that my passion for the field truly ignited, particularly through "virtual police" roleplay, which simulated real-world organizational structures and routines. I started as a curious player and, over time, dove deeper. I worked remotely and voluntarily for one of these organizations, helping develop spelling and conduct courses for new members, and creating internal documents, forums, and organizational rules.',
        'about.p4': 'I also became involved in building internal systems for team management and operational workflows using BBCode within old phpBB forums to organize digital content.',
        'about.p5': 'That experience, even within a game, provided real-world contact with communication, leadership, systems development, remote collaboration, and the power of technology to transform human experiences. It was there that everything started making sense.',
        'about.p6': "I am a developer in training with a focus on modern technologies and a passion for creating efficient solutions. At 20 years old, I am currently in my 4th semester of Information Systems at the University of Uberaba (Uniube). I've completed several courses at Rocketseat and Udemy, gaining practical experience in both front-end and back-end challenges.",
        'about.p7': 'Currently, I work as a Junior Backend Developer at Rakha Tecnologia. I seek to evolve my career, deepen my knowledge, contribute to increasingly challenging projects, and continue growing alongside experienced teams.',
        'about.expertise': 'Technical Expertise',
        'about.philosophy_title': 'Philosophy',
        'about.philosophy_text': 'I believe that software should be invisible. It should empower users without getting in their way. My goal is always to reduce complexity, both in the code I write and the interfaces I create.',

        // Footer
        'footer.copyright': '© 2026 by .com/initpedro',
        'footer.social': 'Social',

        // Cookie Consent
        'cookies.banner': 'This website uses cookies to improve your experience. By continuing, you agree to our use of cookies. Read more in ',
        'cookies.link': 'Cookies',
        'cookies.learn_more': 'Learn more',
        'cookies.accept': 'Accept cookies',

        // Chatbot
        'chat.header.title': "Pedro's Assistant",
        'chat.header.status': 'Online and ready to help',
        'chat.welcome': 'Hi! How can I help you today?',
        'chat.suggestion': "Ask about Pedro's projects or ask for a joke!",
        'chat.placeholder': 'Type a message...',
        'chat.cooldown': 'Wait 3s...',
        'chat.error': "Oops! I'm having a bit of technical interference. Let's try again in a moment?",

        // Legal Pages
        'legal.cookies.title': 'Cookies Policy',
        'legal.cookies.p1': 'This policy explains how we use cookies and similar technologies on our website.',
        'legal.cookies.q1': 'What are cookies?',
        'legal.cookies.a1': 'Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and improve your experience.',
        'legal.cookies.q2': 'How we use them',
        'legal.cookies.a2': 'We only use essential cookies that are necessary for the website to function properly. We do not use third-party tracking or advertising cookies.',

        'legal.terms.title': 'Terms of Service',
        'legal.terms.p1': 'By accessing this website, you agree to be bound by these terms of service and all applicable laws and regulations.',
        'legal.terms.q1': 'Use License',
        'legal.terms.a1': "Permission is granted to temporarily download one copy of the materials on initpedro's website for personal, non-commercial transitory viewing only.",
        'legal.terms.q2': 'Disclaimer',
        'legal.terms.a2': "The materials on this website are provided on an 'as is' basis. initpedro makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",

        'legal.privacy.title': 'Privacy Policy',
        'legal.privacy.p1': "Your privacy is important to us. It is initpedro's policy to respect your privacy regarding any information we may collect from you across our website.",
        'legal.privacy.q1': 'Information we collect',
        'legal.privacy.a1': 'We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.',
        'legal.privacy.q2': 'Data Retention',
        'legal.privacy.a2': "We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.",

        // Status
        'status.online': 'Online',
        'status.offline': 'Offline',
        'status.listening': 'Listening to',
        'status.playing': 'Playing',
        'status.not_listening': 'Not listening to anything',
        'status.message_active': "I'm currently active on Discord. Feel free to reach out!",
        'status.message_away': "I'm currently away or offline. I'll be back soon!",
        'status.member_since': 'Discord Member Since',
        'status.active_dev': 'Active Developer',
        'status.chat_header_active': "Let's chat!",
        'status.chat_header_away': 'Taking a break...',
        'chat.welcome_discord': "Hi! I'm Pedro's AI assistant. Want to know more about his work?",
    },
    'Português (PT-BR)': {
        // ... (existing translations)

        // Projetos
        'projects.kardio.title': '@kardiosoftware',
        'projects.kardio.short': 'App Kanban colaborativo minimalista para equipes e uso pessoal.',
        'projects.kardio.full': 'Uma aplicação web projetada para simplificar a gestão de tarefas através de uma interface Kanban simplificada. Suporta colaboração em tempo real, permitindo que as equipes permaneçam sincronizadas sem esforço.',
        'projects.kardio.about': 'Desenvolvido com foco na facilidade de uso e velocidade, o @kardiosoftware oferece um espaço de trabalho limpo para projetos individuais ou de equipe, garantindo que nada atrapalhe a produtividade.',

        'projects.dentioo.title': 'Dentioo',
        'projects.dentioo.short': 'Micro-SaaS para gestão de clínicas odontológicas e atendimento automatizado.',
        'projects.dentioo.full': 'Uma plataforma de gestão abrangente feita sob medida para dentistas. Os recursos incluem agendamento, prontuários em PDF automatizados e integração com Google Drive para armazenamento.',
        'projects.dentioo.about': 'O Dentioo resolve a carga administrativa das clínicas odontológicas com recursos como histórico do paciente, orçamentos automatizados e um painel super admin para gestão de assinaturas e testes.',

        'projects.aura.title': 'Aura Air',
        'projects.aura.short': 'App de monitoramento ambiental desenvolvido para o NASA Space Apps Hackathon para rastrear a qualidade do ar em tempo real.',
        'projects.aura.full': 'O Aura Air foi desenvolvido durante o NASA Space Apps Hackathon em Uberlândia por uma equipe de 4 alunos da Universidade de Uberaba. O app utiliza dados atmosféricos da NASA e a API do Google Maps para ajudar os usuários a visualizar e navegar por caminhos com base na qualidade do ar em tempo real.',
        'projects.aura.about': 'Projetado para enfrentar desafios ambientais globais, o Aura Air permite que os usuários criem contas, visualizem alertas de qualidade do ar e escolham rotas mais saudáveis. Isso é particularmente benéfico para usuários com condições respiratórias, fornecendo avaliações de risco em tempo real e otimizações de trajeto.',

        'projects.mvc.title': 'MVC User Management',
        'projects.mvc.short': 'Sistema .NET MVC construído com C#, princípios de OOP e MySQL para gestão segura de usuários.',
        'projects.mvc.full': 'Uma aplicação robusta de gestão de usuários construída com o padrão Model-View-Controller. Lida com dados de usuários de forma segura com um backend MySQL dedicado, enfatizando uma arquitetura limpa.',
        'projects.mvc.about': 'Este projeto demonstra princípios avançados de Programação Orientada a Objetos (OOP) em C#, garantindo uma base de código altamente sustentável e escalável para gestão de usuários em nível empresarial.',
        // Navbar
        'nav.home': 'Início',
        'nav.work': 'Trabalhos',
        'nav.about': 'Sobre',
        'nav.back': 'Voltar para Início',
        'nav.say_hello': 'Diga Olá',

        // Home
        'home.hero.title': 'Desenvolvedor de Software',
        'home.hero.subtitle': 'Júnior',
        'home.hero.description': 'Olá, eu sou o Pedro. Sou um Desenvolvedor de Software Backend dedicado a construir soluções inovadoras, escaláveis e de alta performance tanto para aplicações móveis quanto web, com especialidade em C#.',
        'home.hero.cv': 'Currículo Virtual',
        'home.hero.works': 'Trabalhos',

        // Work
        'work.title': 'Trabalhos Selecionados',
        'work.description': 'Estes são alguns dos meus projetos em destaque. Você pode explorar mais do meu trabalho no meu GitHub. Além destes, tenho experiência profissional desenvolvendo sistemas empresariais personalizados, incluindo gestão de chamados, controle de demandas, geradores de propostas, DREs customizados, sistemas de fluxo de caixa e outras soluções de negócios sob medida.',
        'work.see_details': 'Ver Detalhes',
        'work.modal.technologies': 'Tecnologias',
        'work.modal.about': 'Sobre o Projeto',
        'work.modal.github': 'Repositório GitHub',
        'work.modal.demo': 'Demo ao Vivo',
        'work.modal.close': 'Fechar detalhes',

        // About
        'about.title': 'Sobre Mim',
        'about.p1': 'Eu sou o Pedro Henrique Ferreira Fonseca. A tecnologia me fascina desde que eu era jovem.',
        'about.p2': 'Em 2015, comecei a explorar este universo mais profundamente através de jogos online, fóruns e baixando música—assim como muitos outros na época. Nunca fiz cursos formais de TI naquela época, mas as pessoas sempre me perguntavam se eu tinha feito, porque eu parecia dominar tudo naturalmente.',
        'about.p3': 'Foi no Habbo Hotel que minha paixão pela área realmente acendeu, particularmente através do roleplay de "polícia virtual", que simulava estruturas e rotinas organizacionais do mundo real. Comecei como um jogador curioso e, com o tempo, mergulhei mais fundo. Trabalhei remotamente e voluntariamente para uma dessas organizações, ajudando a desenvolver cursos de ortografia e conduta para novos membros, e criando documentos internos, fóruns e regras organizacionais.',
        'about.p4': 'Também me envolvi na construção de sistemas internos para gestão de equipe e fluxos operacionais usando BBCode em antigos fóruns phpBB para organizar conteúdo digital.',
        'about.p5': 'Essa experiência, mesmo dentro de um jogo, proporcionou um contato no mundo real com comunicação, liderança, desenvolvimento de sistemas, colaboração remota e o poder da tecnologia para transformar experiências humanas. Foi ali que tudo começou a fazer sentido.',
        'about.p6': 'Sou um desenvolvedor em formação com foco em tecnologias modernas e paixão por criar soluções eficientes. Aos 20 anos, estou atualmente no 4º semestre de Sistemas de Informação na Universidade de Uberaba (Uniube). Concluí diversos cursos na Rocketseat e Udemy, ganhando experiência prática em desafios de front-end e back-end.',
        'about.p7': 'Atualmente, trabalho como Desenvolvedor Backend Júnior na Rakha Tecnologia. Busco evoluir minha carreira, aprofundar meus conhecimentos, contribuir para projetos cada vez mais desafiadores e continuar crescendo ao lado de equipes experientes.',
        'about.expertise': 'Expertise Técnica',
        'about.philosophy_title': 'Filosofia',
        'about.philosophy_text': 'Acredito que o software deve ser invisível. Ele deve empoderar os usuários sem ficar no caminho deles. Meu objetivo é sempre reduzir a complexidade, tanto no código que escrevo quanto nas interfaces que crio.',

        // Footer
        'footer.copyright': '© 2026 por .com/initpedro',
        'footer.social': 'Social',

        // Cookie Consent
        'cookies.banner': 'Este site utiliza cookies para melhorar sua experiência. Ao continuar, você concorda com o uso de cookies. Leia mais em ',
        'cookies.link': 'Cookies',
        'cookies.learn_more': 'Saber mais',
        'cookies.accept': 'Aceitar cookies',

        // Chatbot
        'chat.header.title': 'Assistente do Pedro',
        'chat.header.status': 'Online e pronto para ajudar',
        'chat.welcome': 'Olá! Como posso te ajudar hoje?',
        'chat.suggestion': 'Pergunte sobre os projetos do Pedro ou peça uma piada!',
        'chat.placeholder': 'Digite uma mensagem...',
        'chat.cooldown': 'Aguarde 3s...',
        'chat.error': 'Ops! Estou com um pouco de interferência técnica. Vamos tentar novamente em um momento?',

        // Legal Pages
        'legal.cookies.title': 'Política de Cookies',
        'legal.cookies.p1': 'Esta política explica como usamos cookies e tecnologias similares em nosso site.',
        'legal.cookies.q1': 'O que são cookies?',
        'legal.cookies.a1': 'Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita um site. Eles ajudam o site a lembrar suas preferências e melhorar sua experiência.',
        'legal.cookies.q2': 'Como os usamos',
        'legal.cookies.a2': 'Usamos apenas cookies essenciais que são necessários para que o site funcione corretamente. Não usamos cookies de rastreamento de terceiros ou publicidade.',

        'legal.terms.title': 'Termos de Serviço',
        'legal.terms.p1': 'Ao acessar este site, você concorda em cumprir estes termos de serviço e todas as leis e regulamentos aplicáveis.',
        'legal.terms.q1': 'Licença de Uso',
        'legal.terms.a1': 'É concedida permissão para baixar temporariamente uma cópia dos materiais no site da initpedro apenas para visualização transitória pessoal e não comercial.',
        'legal.terms.q2': 'Isenção de Responsabilidade',
        'legal.terms.a2': "Os materiais no site da initpedro são fornecidos 'como estão'. initpedro não oferece garantias, expressas ou implícitas, e por este meio isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.",

        'legal.privacy.title': 'Política de Privacidade',
        'legal.privacy.p1': 'Sua privacidade é importante para nós. É política da initpedro respeitar a sua privacidade em relação a qualquer informação que possamos coletar de você em nosso site.',
        'legal.privacy.q1': 'Informações que coletamos',
        'legal.privacy.a1': 'Só pedimos informações pessoais quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.',
        'legal.privacy.q2': 'Retenção de Dados',
        'legal.privacy.a2': 'Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Os dados que armazenamos, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.',

        // Status
        'status.online': 'Online',
        'status.offline': 'Offline',
        'status.listening': 'Ouvindo',
        'status.playing': 'Jogando',
        'status.not_listening': 'Não está ouvindo nada',
        'status.message_active': 'Estou ativo no Discord no momento. Sinta-se à vontade para entrar em contato!',
        'status.message_away': 'Estou ausente ou offline no momento. Volto logo!',
        'status.member_since': 'Membro do Discord desde',
        'status.active_dev': 'Desenvolvedor Ativo',
        'status.chat_header_active': 'Vamos conversar!',
        'status.chat_header_away': 'Fazendo uma pausa...',
        'chat.welcome_discord': 'Olá! Eu sou o assistente de IA do Pedro. Quer saber mais sobre o trabalho dele?',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('English');

    useEffect(() => {
        const savedLang = localStorage.getItem('userLanguage') as Language;
        if (savedLang && (savedLang === 'English' || savedLang === 'Português (PT-BR)')) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('userLanguage', lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
