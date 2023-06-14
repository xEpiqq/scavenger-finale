export const welcomeEmail = (name) => {
    return {
        subject: `Welcome to Scavenger, ${name}!`,
        text: `Welcome to ScavengerAI, ${name}! We are excited to have you onboard. We are creating a community of fellow freelance developers to practive and support each other in getting clients. We hope you will join us! You can find our Discord server at https://discord.gg/MMuUKFFX.`,
        html: `<p>Welcome to ScavengerAI, ${name}! We are excited to have you onboard. We are creating a community of fellow freelance developers, and we hope you will join us! You can find our Discord server at https://discord.gg/MMuUKFFX.</p>`,
    }
}