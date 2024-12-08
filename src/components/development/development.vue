<script setup>
import { ref } from 'vue';

const block2 = ref(null);

const scrollToBottom = async (frame) => {
    window.scrollTo({ top: frame.clientHeight, behavior: "smooth" });
};
</script>

<template>
    <div class="content">
        <n-flex :align="'center'">
            <div class="slogan"><b>Development<br /> History</b></div>
            <n-divider />
            <n-grid :x-gap="24">
                <n-gi :span="6">
                    <h2>December 8, 2024</h2>
                </n-gi>
                <n-gi :span="18">
                    <h2>Launching the Website: First Testing and Trial Run</h2>
                    <p>After weeks of hard work, I finally reached the most exciting part of this journey—launching my
                        web app! But before I made it live, I knew I had to thoroughly test everything to make sure it
                        worked perfectly.</p>
                    <h4>Testing Every Feature</h4>
                    <p>I went through each feature of the app with a fine-tooth comb:</p>
                    <ul>
                        <li>
                            <p>Check-In Functionality: I tested the "Get Credit" button under all conditions—when a user
                                checks in on time, when they try to check in multiple times a day, and when they miss
                                the
                                check-in window. Everything worked as expected!</p>
                        </li>
                        <li>
                            <p>Reward Redemption: I made sure users could add and redeem rewards seamlessly, with
                                credits
                                being updated correctly in real-time.</p>
                        </li>
                        <li>
                            <p>Parent and Child Modes: I verified that parents could set check-in times and rewards
                                while
                                kids could only check in and redeem rewards. The family ID system worked smoothly,
                                linking
                                both roles without any hiccups.</p>
                        </li>
                        <li>
                            <p>Performance Across Devices: I tested the app on different devices and browsers to ensure
                                a consistent experience. Thanks to the Cloudflare setup, even users in mainland China
                                experienced smooth performance.</p>
                        </li>
                    </ul>
                </n-gi>
            </n-grid>
            <n-grid :x-gap="24">
                <n-gi :span="6">
                    <h2>December 1, 2024</h2>
                </n-gi>
                <n-gi :span="18">
                    <h2>Connecting Frontend and Backend, and Deployment Challenges</h2>
                    <p>This week, I successfully connected my frontend and backend! It was so exciting to see the two
                        sides of my app finally working together, but my excitement was short-lived when I hit a major
                        roadblock: deployment. I learned that GitHub Pages only supports static websites, which means I
                        couldn’t deploy my backend or database on the same platform.</p>
                    <h4>Help from My Teacher</h4>
                    <p>At this point, I sought help from my computer science teacher, Mr. Rui, who came to the rescue
                        with an amazing solution. He offered to let me use his AWS server for free, which was a
                        lifesaver because renting a server on my own would be pretty expensive for a student. With his
                        help, I deployed my backend and database on the AWS server and finally got everything running
                        smoothly.</p>
                    <h4>Solving the Speed Issue</h4>
                    <p>While testing the app, we noticed another issue: users in mainland China were experiencing very
                        slow loading speeds. Mr. Rui explained that this was because GitHub doesn’t have servers in
                        mainland China, so accessing the site from here takes longer. To solve this, he suggested
                        registering a domain name and using Cloudflare to set up DNS mapping to github.io. By doing
                        this, we could take advantage of Cloudflare’s global CDN nodes, which provide free acceleration
                        for websites. This solution dramatically improved loading times for users in China.</p>
                </n-gi>
            </n-grid>
            <n-divider />
            <n-grid :x-gap="24">
                <n-gi :span="6">
                    <h2>November 24, 2024</h2>
                </n-gi>
                <n-gi :span="18">
                    <h2>Facing Challenges with Backend and Database Development</h2>
                    <p>I thought setting up the backend and database would be a smooth ride, but it turned out to be
                        much harder than I expected. Unlike the frontend, which felt more intuitive and visual, the
                        backend and database required me to wrap my head around new concepts and tools. It took me quite
                        a while to get my local database set up and successfully connected to the backend.</p>
                    <p>To finally make progress, I turned to an online guide from <n-button type="primary" text tag="a"
                            href="https://www.bezkoder.com/node-js-tutorial/"
                            target="_blank"><b><u>Bezkoder</u></b></n-button>.
                        Following the tutorial step
                        by step, I managed to create a database and connect it to my app using Node.js. It felt like a
                        huge victory when I was able to run my first successful query!</p>
                    <h4>Creating the Database Tables</h4>
                    <p>After the setup, I designed and created four tables for the app’s functionality:</p>
                    <ol>
                        <li>
                            <p>Families Table:
                                This table stores the 4-digit family unique ID (UID) and the family’s total credits. It
                                acts as the central hub for tracking each family’s data.
                            </p>
                        </li>
                        <li>
                            <p>Records Table:
                                This table keeps track of every event that changes the family’s credits, such as early
                                check-ins or reward redemptions. I realized that if I didn’t record check-in events, the
                                frontend wouldn’t be able to verify if a user had already checked in for the day. This
                                table ensures that the app knows whether the user has earned credits or not on any given
                                day.</p>
                        </li>
                        <li>
                            <p>Redeems Table:
                                This table is used to store the details of rewards available for redemption. It includes
                                the type of reward, its name, and the number of credits required to redeem it. This
                                makes it easy to manage the rewards system and ensure users can exchange their credits
                                for the items they want.</p>
                        </li>
                    </ol>
                </n-gi>
            </n-grid>
            <n-divider />
            <n-grid :x-gap="24">
                <n-gi :span="6">
                    <h2>November 13, 2024</h2>
                </n-gi>
                <n-gi :span="18">
                    <h2>Choosing Backend and Database Technologies</h2>
                    <p>As my app evolved, I realized it needed a solid backend to manage data and logic efficiently.
                        Since this is my first full-stack project, I wanted to keep things simple and stick to what I
                        already know. That’s why I chose Node.js for the backend. Since it uses JavaScript—the same
                        language I’m using for the frontend—it saves me the trouble of learning a new programming
                        language. Plus, Node.js is lightweight and perfectly capable of handling the needs of my app.
                        For the database, I decided to use PostgreSQL.
                    </p>
                </n-gi>
            </n-grid>
            <n-divider />
            <n-grid :x-gap="24">
                <n-gi :span="6">
                    <h2>November 10, 2024</h2>
                </n-gi>
                <n-gi :span="18">
                    <h2>Adjusting User Logic and Roles</h2>
                    <p>When I first came up with this app, it was all about helping me wake up earlier because, let’s
                        face it, my self-discipline isn’t exactly perfect. But as I thought more about the app’s
                        purpose, I realized that if I had full control over every feature, it would likely turn into
                        just a fun toy for me to play with. That’s not what I wanted—I wanted it to genuinely help with
                        building better habits.</p>
                    <h4>Introducing Parent and Child Roles</h4>
                    <p>To make the app more effective, I decided to bring my parents into the mix. I split the app into
                        two roles: Parent Mode and Child Mode. Here’s how it works:</p>
                    <ul>
                        <li>
                            <p>Parent Mode: Parents can set the wake-up time for their kids to check in. They also have
                                control over adding rewards and adjusting how many credits are needed to redeem them.
                            </p>
                        </li>
                        <li>
                            <p>Child Mode: Kids can focus on their role—checking in on time and redeeming rewards. They
                                don’t have access to modify the rules or rewards, which keeps the system fair and
                                functional.</p>
                        </li>
                    </ul>
                    <h4>Simplifying the User Experience</h4>
                    <p>One of my biggest concerns was making sure the app was easy to use right from the start. I didn’t
                        want users to feel overwhelmed by a complicated sign-up process or account management. So,
                        instead of creating a traditional user system, I decided to use a unique family ID. Here’s how
                        it works:</p>
                    <ul>
                        <li>
                            <p>When a family first visits the app’s landing page, they can generate a new 4-digit family
                                ID.</p>
                        </li>
                        <li>
                            <p>This ID links parents and kids, allowing them to see each other’s data.</p>
                        </li>
                        <li>
                            <p>All credits, rewards, and check-in details are tied to the family ID. As long as everyone
                                uses the same ID, they’re connected.</p>
                        </li>
                    </ul>
                </n-gi>
            </n-grid>
            <n-divider />
            <n-grid :x-gap="24">
                <n-gi :span="6">
                    <h2>October 26, 2024</h2>
                </n-gi>
                <n-gi :span="18">
                    <h2>Building the Core Pages</h2>
                    <p>After planning and designing the app, it was time to dive into the coding! This week, I built two
                        essential pages for my app: the <b>Get Credit Page</b> and the <b>Rewards Redemption Page</b>.
                        These are the
                        heart of the app, making sure users stay motivated and engaged.</p>
                    <h4>Get Credit Page</h4>
                    <p>This page handles three important scenarios to ensure fair and consistent credit rewards:</p>
                    <ol>
                        <li>
                            <p>Earning Credits: If you scan the QR code and haven’t claimed your credit for the day, a
                                big "Get Credit" button will appear. Clicking it lets you collect your credits for
                                successfully waking up early.</p>
                        </li>
                        <li>
                            <p>No Double Dipping: Once you’ve claimed your credit for the day, the "Get Credit" button
                                disappears. This prevents users from gaming the system and earning multiple credits in
                                one day.</p>
                        </li>
                        <li>
                            <p>Missed Check-In: If you don’t check in on time, the app won’t show the "Get Credit"
                                button. Instead, it will display a friendly reminder encouraging you to check in earlier
                                next time. I thought this was an important touch to keep users on track without being
                                too harsh.</p>
                        </li>
                    </ol>
                    <h4>Rewards Redemption Page</h4>
                    <p>This page is where users can set up rewards for themselves and redeem them using the credits
                        they’ve earned. Here’s how it works:</p>
                    <ul>
                        <li>
                            <p>Customizing Rewards: Users can add their own rewards and assign how many credits each
                                reward costs. For example, 50 credits might get you a new book, or 100 credits could
                                unlock a cool gadget you’ve been eyeing.</p>
                        </li>
                        <li>
                            <p>Redeeming Rewards: Once you have enough credits, you can redeem your chosen reward
                                directly on this page. It’s satisfying to see your morning efforts pay off in tangible
                                ways!</p>
                        </li>
                    </ul>
                </n-gi>
            </n-grid>
            <n-divider />
            <n-grid :x-gap="24">
                <n-gi :span="6">
                    <h2>October 23, 2024</h2>
                </n-gi>
                <n-gi :span="18">
                    <h2>Refining My App Design</h2>
                    <p>When I started thinking about how to make my app truly effective, I realized its core purpose
                        needed to be motivation. It’s not enough to just have an alarm or a reminder—I wanted something
                        that would actively encourage people (and myself!) to wake up early and enjoy the benefits of a
                        productive morning. To make this happen, I explored two fascinating ideas: expectancy theory and
                        intrinsic motivation.</p>
                    <h4>Expectancy Theory</h4>
                    <p>This theory, introduced by psychologist Victor Vroom, explains that people are driven by their
                        expectations of positive outcomes. For example, if you believe that waking up early will lead to
                        something great—like having a calm, productive morning or getting ahead in your day—you’re more
                        likely to work toward that goal. I thought this was such a powerful way to approach motivation
                        for my app.</p>
                    <h4>Intrinsic Motivation</h4>
                    <p>After deployment, the focus shifted to enhancing functionality. This included refining the
                        credits
                        redemption system and adding a leaderboard feature to foster a competitive spirit among users.
                        Additional testing ensured the app was robust and responsive across different platforms.</p>
                    <h4>Feature Enhancement</h4>
                    <p>This is when you’re motivated by the activity itself, not just the rewards. For instance, if you
                        genuinely enjoy the peace and quiet of early mornings or the satisfaction of checking things off
                        your to-do list, you’ll naturally want to wake up early. It’s not about external rewards but the
                        positive feelings that come with the behavior.</p>
                    <h4>My Idea: QR Code + Rewards</h4>
                    <p>To combine these ideas, I decided to make the app’s entry point a little creative: users will
                        need to scan a QR code placed on the bathroom mirror to check in after waking up. This way,
                        you’re out of bed and actively starting your day. Once you check in, the app rewards you with
                        credits. These credits can be accumulated and redeemed for prizes that personally motivate
                        you—like a cool gadget, a book, or even something simple like your favorite snack.</p>
                    <p></p>
                </n-gi>
            </n-grid>
            <n-divider />
            <n-grid :x-gap="24">
                <n-gi :span="6">
                    <h2>October 20, 2024</h2>
                </n-gi>
                <n-gi :span="18">
                    <h2>Leveling Up My Tech Stack</h2>
                    <p>I added the Naive UI component library to my project so I wouldn’t have to spend hours writing
                        basic CSS for buttons and layouts. Honestly, this saved me so much time. Since I’m not old
                        enough to buy a domain name, I decided to use GitHub Pages to publish my website for free. It’s
                        super convenient because all my code is already on GitHub, and I set up GitHub Actions to
                        automatically deploy updates whenever I make changes. It feels like having a mini professional
                        setup!
                    </p>
                </n-gi>
            </n-grid>
            <n-divider />
            <n-grid :x-gap="24">
                <n-gi :span="6">
                    <h2>October 16, 2024</h2>
                </n-gi>
                <n-gi :span="18">
                    <h2>Conceptualizing the App</h2>
                    <p>The idea for my app started with my own morning struggles. No matter how early I go to bed,
                        waking up on time has always been a challenge for me. This usually means my mornings are a big
                        rush, and I often forget things like my laptop, notebooks, or even my pencil case. It’s
                        frustrating and makes my day feel chaotic before it’s even started.
                    </p>
                    <p>That’s when I thought: wouldn’t it be amazing to have an app that helps me wake up and actually
                        get out of bed earlier? I wanted to create something that could transform me from a lazy bug
                        into an early bird. That’s how I came up with the concept for my "Lucky Cat Morning App"—a tool
                        to make mornings smoother and less stressful.</p>
                    <h2>Planning the App</h2>
                    <p>This is my first time working on a programming project, so I wanted to pick tools that were
                        beginner-friendly but still powerful enough to bring my idea to life. I decided to use HTML,
                        CSS, and JavaScript, which are great for getting started with web development. To make things
                        even better, I added Vue to the mix because it’s lightweight and makes building apps more
                        manageable.
                    </p>
                    <p>My goal is to create an app that’s simple, effective, and easy to use. Starting with these tools
                        felt like the perfect choice for a beginner like me. Plus, I’m learning a lot along the way,
                        which makes the whole process even more exciting.</p>
                </n-gi>
            </n-grid>
        </n-flex>
    </div>
</template>

<style lang="less" scoped>
.content {
    width: 1200px;
    margin: 0 auto;
    padding: 24px;

    .slogan {
        font-size: 96px;
        line-height: 86px;
        letter-spacing: -0.075em;
        word-spacing: 0.1em;
        margin-bottom: 42px;
    }
}
</style>