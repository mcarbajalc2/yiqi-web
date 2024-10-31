import {
  UsersIcon,
  BarChart3Icon,
  CalendarIcon,
  MessageSquareIcon,
  Settings2Icon,
  HeartHandshakeIcon
} from 'lucide-react'

type Organization = {
  name: string
  logo: string
}

export type EventListItem = {
  id: string
  title: string
  description: string
  image: string
  startDate: string
  location: string
  organization: Organization
}

// False data based on the prism shema
export const eventListItem: EventListItem[] = [
  {
    id: '8', // ID del evento
    title: 'Tech Conference 2023', // Título
    description: 'Únete a la mayor conferencia tecnológica del año.', // Descripción
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c', // Imagen
    startDate: '2023-09-15T09:00:00Z', // Fecha y hora del evento
    location: 'San Francisco, CA', // Ubicación del evento
    organization: {
      name: 'IgmeDAO', // Nombre del COMUNIDAD organizador
      logo: 'https://images.unsplash.com/photo-1542744095-291d1f67b221' // LOGO DE LA COMUNIDAD
    }
  },
  {
    id: '1',
    title: 'Tech Conference 2023',
    description: 'Únete a la mayor conferencia tecnológica del año.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    startDate: '2023-09-15T09:00:00Z',
    location: 'San Francisco, CA',
    organization: {
      name: 'IgmeDAO',
      logo: 'https://images.unsplash.com/photo-1542744095-291d1f67b221'
    }
  },
  {
    id: '2',
    title: 'Healthcare Innovation Summit',
    description: 'Descubre los avances más recientes en tecnología de salud.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    startDate: '2023-10-10T10:00:00Z',
    location: 'New York, NY',
    organization: {
      name: 'HealthTech Hub',
      logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
    }
  },
  {
    id: '3',
    title: 'Green Energy Expo',
    description: 'Conoce el futuro de la energía renovable.',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a',
    startDate: '2023-11-05T08:30:00Z',
    location: 'Los Angeles, CA',
    organization: {
      name: 'EcoWorld',
      logo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
    }
  },
  {
    id: '4',
    title: 'AI & Robotics Symposium',
    description: 'Explora el impacto de la IA y robótica en el mundo moderno.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    startDate: '2023-12-02T12:00:00Z',
    location: 'Boston, MA',
    organization: {
      name: 'RoboTech Association',
      logo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
    }
  },
  {
    id: '5',
    title: 'Finance & Blockchain Summit',
    description:
      'Aprende sobre las últimas innovaciones en blockchain y finanzas.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    startDate: '2024-01-15T09:00:00Z',
    location: 'Chicago, IL',
    organization: {
      name: 'CryptoNet',
      logo: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34'
    }
  },
  {
    id: '6',
    title: 'Educational Technology Forum',
    description: 'Transformando la educación a través de la tecnología.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    startDate: '2024-02-20T11:00:00Z',
    location: 'Seattle, WA',
    organization: {
      name: 'EdTech Innovators',
      logo: 'https://images.unsplash.com/photo-1506765515384-028b60a970df'
    }
  },
  {
    id: '7',
    title: 'Art & Design Expo',
    description: 'Una celebración de arte y diseño en todas sus formas.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad',
    startDate: '2024-03-18T14:00:00Z',
    location: 'Miami, FL',
    organization: {
      name: 'Creative Minds',
      logo: 'https://images.unsplash.com/photo-1499336315816-097655dcfbda'
    }
  }
]

export const communityHighlights = [
  {
    id: 'org1',
    name: 'Tech Innovators',
    logo: 'https://images.unsplash.com/photo-1542744095-291d1f67b221',
    description: 'A community of tech enthusiasts driving innovation.',
    link: '/communities/org1'
  },
  {
    id: 'org2',
    name: 'Health and Wellness',
    logo: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    description: 'Join us to promote a healthy lifestyle and well-being.',
    link: '/communities/org2'
  },
  {
    id: 'org3',
    name: 'Green Earth Advocates',
    logo: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    description: 'Environmental activists working to make a greener planet.',
    link: '/communities/org3'
  },
  {
    id: 'org4',
    name: 'Art & Culture Society',
    logo: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38',
    description: 'Where art, music, and culture enthusiasts meet.',
    link: '/communities/org4'
  }
]

export const eventDetails = {
  id: '1', // ID del evento
  title: 'Tech Conference 2023', // Título
  description: 'Explora las últimas tendencias tecnológicas...', // Descripción extendida
  startDate: '2023-09-15T09:00:00Z', // Fecha y hora de inicio
  endDate: '2023-09-15T18:00:00Z', // Fecha y hora de fin
  location: 'San Francisco, CA', // Ubicación física
  virtualLink: 'https://zoom.us/j/123456789', // Enlace virtual (si aplica)
  maxAttendees: 500, // Máximo de asistentes permitidos
  requiresApproval: false, // Si requiere aprobación para asistir

  organizer: {
    name: 'Marcial Igme', // Nombre del organizador
    avatar: 'https://example.com/john-doe.jpg', // Imagen del organizador
    role: 'ADMIN' // Rol del organizador
  },

  customFields: {
    field1: 'Información adicional 1',
    field2: 'Información adicional 2'
  }, // Campos personalizados

  queueJobs: [], // Trabajos en cola relacionados (si aplica)

  notifications: [
    {
      id: 'n1',
      message: 'Evento confirmado',
      type: 'email',
      sentAt: '2023-09-10T10:00:00Z'
    }
  ], // Notificaciones relacionadas

  forms: [
    {
      id: 'f1',
      title: 'Encuesta de Satisfacción',
      submissionCount: 20
    }
  ], // Formularios asociados

  media: [
    {
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
    },
    {
      type: 'PDF',
      url: 'https://example.com/schedule.pdf'
    }
  ], // Medios generados relacionados

  registrations: [
    {
      userId: 'u1',
      status: 'PENDING',
      paid: true
    }
  ], // Registro de asistentes

  bots: [
    {
      model: 'GPT-4',
      instructions: 'Responder preguntas sobre el evento.'
    }
  ], // Bots asociados al evento

  createdAt: '2023-09-01T12:00:00Z', // Fecha de creación
  updatedAt: '2023-09-10T15:30:00Z' // Última actualización
}

export const communityDetail = {
  id: 'org1',
  name: 'Tech Innovators',
  logo: 'https://images.unsplash.com/photo-1542744095-291d1f67b221',
  description: 'A community of tech enthusiasts driving innovation.',
  colour: '#4CAF50',
  events: [
    {
      id: 'event1',
      title: 'Tech Expo 2024',
      startDate: '2024-11-05T10:00:00Z',
      endDate: '2024-11-06T18:00:00Z',
      location: 'San Francisco, CA',
      virtualLink: 'https://tech-expo-2024.com',
      maxAttendees: 500
    },
    {
      id: 'event2',
      title: 'AI Conference',
      startDate: '2024-12-12T09:00:00Z',
      endDate: '2024-12-14T17:00:00Z',
      location: 'New York, NY',
      virtualLink: 'https://ai-conference.com',
      maxAttendees: 300
    }
  ],
  organizers: [
    {
      name: 'John Doe',
      role: 'ADMIN',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      name: 'Jane Smith',
      role: 'VIEWER',
      avatar: 'https://randomuser.me/api/portraits/women/60.jpg'
    }
  ],
  createdAt: '2022-04-15T10:00:00Z',
  updatedAt: '2024-09-12T10:00:00Z',
  queueJobs: [
    {
      id: 'queue1',
      description: 'Process event registrations'
    }
  ],
  customFields: {
    focus: 'Innovation in AI and Robotics',
    partnerships: 'Collaborating with major tech companies'
  }
}

export const features = [
  {
    title: 'Community Management',
    description:
      'Efficiently manage your community members, roles, and permissions with our intuitive tools.',
    icon: UsersIcon
  },
  {
    title: 'Analytics & Insights',
    description:
      "Make data-driven decisions with comprehensive analytics about your community's engagement.",
    icon: BarChart3Icon
  },
  {
    title: 'Event Organization',
    description:
      'Plan, schedule, and manage community events seamlessly with integrated calendar features.',
    icon: CalendarIcon
  },
  {
    title: 'Discussion Forums',
    description:
      'Foster meaningful conversations with customizable discussion spaces and moderation tools.',
    icon: MessageSquareIcon
  },
  {
    title: 'Customization',
    description:
      "Tailor the platform to match your community's unique needs and branding requirements.",
    icon: Settings2Icon
  },
  {
    title: 'Community Engagement',
    description:
      'Build stronger connections with tools designed to increase member participation and interaction.',
    icon: HeartHandshakeIcon
  }
]