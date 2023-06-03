export const welcomeEmail = (name) => {
    return {
        subject: `Welcome to ScavengerAI, ${name}!`,
        text: `Welcome to ScavengerAI, ${name}!`,
        html: `<p>Welcome to ScavengerAI, ${name}!</p>`,
    }
}