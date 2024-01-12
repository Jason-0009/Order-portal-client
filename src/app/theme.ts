import { createTheme } from '@mui/material/styles'

const coreTheme = {
    typography: {
        fontFamily: '"Open Sans", "Heebo", sans-serif',
        fontSize: 14
    }
}

const lightTheme = createTheme({
    ...coreTheme,
    palette: {
        mode: 'light',
        primary: {
            main: '#FFFFFF'
        },
        secondary: {
            main: '#F2F2F2'
        },
        text: {
            primary: '#171717',
            secondary: '#5D5D5D'
        },
        buttonBackground: {
            main: '#FE9381'
        },
        link: {
            main: '#2E69FF'
        },
        status: {
            pending: {
                background: {
                    main: '#BDB2FF'
                },
                text: {
                    main: '#4B51F4'
                }
            },
            inCharge: {
                background: {
                    main: '#FFFB9C'
                },
                text: {
                    main: '#CDAF14'
                }
            },
            delivering: {
                background: {
                    main: '#FFA0B1'
                },
                text: {
                    main: '#DD293F'
                }
            },
            delivered: {
                background: {
                    main: '#9AEDC5'
                },
                text: {
                    main: '#25B87B'
                }
            }
        },
        badgeBackground: { 
            main: '#FFCCCB' 
        }
    }
})

const darkTheme = createTheme({
    ...coreTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#232222'
        },
        secondary: {
            main: '#171717'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#BEBEBE'
        },
        background: {
            default: '#232222'
        },
        buttonBackground: {
            main: '#E51A1A'
        },
        link: {
            main: '#2EB4FF'
        },
        status: {
            pending: {
                background: {
                    main: '#1E2777'
                },
                text: {
                    main: '#5884F6'
                }
            },
            inCharge: {
                background: {
                    main: '#4c3b39'
                },
                text: {
                    main: '#e2a169'
                }
            },
            delivering: {
                background: {
                    main: '#730F0F'
                },
                text: {
                    main: '#FF351A'
                }
            },
            delivered: {
                background: {
                    main: '#314C4E'
                },
                text: {
                    main: '#49B496'
                }
            }
        },
        badgeBackground: { 
            main: '#8B0000' 
        }
    }
})

export { lightTheme, darkTheme }
