const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        title: {
            type: String,
            required: true,
            default: 'My Resume',
        },

        // template: {
        //     type: String,
        //     enum: ['modern', 'classic'],
        //     default: 'modern',
        // },
        template: {
            type: String,
            enum: ['classic', 'modern', 'minimal', 'professional'],
            default: 'classic',
        },

        fullName: {
            type: String,
            default: '',
        },

        jobTitle: {
            type: String,
            default: '',
        },

        email: {
            type: String,
            default: '',
        },
        linkedinUrl: {
            type: String,
            default: '',
        },

        githubProfileUrl: {
            type: String,
            default: '',
        },

        phone: {
            type: String,
            default: '',
        },

        location: {
            type: String,
            default: '',
        },

        summary: {
            type: String,
            default: '',
        },

        role: {
            type: String,
            default: '',
        },

        company: {
            type: String,
            default: '',
        },

        startDate: {
            type: String,
            default: '',
        },

        endDate: {
            type: String,
            default: '',
        },

        description: {
            type: String,
            default: '',
        },

        degree: {
            type: String,
            default: '',
        },

        institute: {
            type: String,
            default: '',
        },

        graduationYear: {
            type: String,
            default: '',
        },

        educationDetails: {
            type: [
                {
                    degree: {
                        type: String,
                        default: '',
                    },

                    institute: {
                        type: String,
                        default: '',
                    },

                    year: {
                        type: String,
                        default: '',
                    },

                    score: {
                        type: String,
                        default: '',
                    },

                    location: {
                        type: String,
                        default: '',
                    },
                },
            ],
            default: [],
        },

        skills: {
            type: String,
            default: '',
        },

        skillCategories: {


            programmingLanguages: {
                type: String,
                default: '',
            },
            frontend: {
                type: String,
                default: '',
            },

            backend: {
                type: String,
                default: '',
            },

            database: {
                type: String,
                default: '',
            },

            tools: {
                type: String,
                default: '',
            },

            coreSubjects: {
                type: String,
                default: '',
            },

            otherSkills: {
                type: String,
                default: '',
            },
        },

        projects: {
            type: String,
            default: '',
        },

        projectDetails: {
            type: [
                {
                    title: {
                        type: String,
                        default: '',
                    },

                    techStack: {
                        type: String,
                        default: '',
                    },

                    description: {
                        type: String,
                        default: '',
                    },

                    githubUrl: {
                        type: String,
                        default: '',
                    },

                    liveUrl: {
                        type: String,
                        default: '',
                    },
                },
            ],
            default: [],
        },

        achievements: {
            type: String,
            default: '',
        },

        certifications: {
            type: String,
            default: '',
        },
        certificationDetails: {
            type: [
                {
                    title: {
                        type: String,
                        default: '',
                    },

                    issuer: {
                        type: String,
                        default: '',
                    },

                    year: {
                        type: String,
                        default: '',
                    },

                    credentialUrl: {
                        type: String,
                        default: '',
                    },
                },
            ],
            default: [],
        },

        profileImage: {
            type: String,
            default: '',
        },

        isPublic: {
            type: Boolean,
            default: false,
        },

        publicId: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Resume', resumeSchema)