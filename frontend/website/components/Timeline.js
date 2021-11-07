import { useState } from "react";

const Divider = () => {
    return <div style={{ borderBottom: "1px solid #e5e5e5" }} />;
};

const Year = ({ children }) => {
    return <h3>{children}</h3>;
};

const Step = ({ title, children, succeed, inProgress }) => {
    return (
        <li>
            <div>
                <h4>
                    {inProgress ? "🚧" : succeed ? "✅" : "❌"} {title}
                </h4>
            </div>
            <p>{children}</p>
        </li>
    );
};

const FullTimeline = () => (
    <>
        <Divider />
        <Year>2018</Year>
        <ul>
            <Step title="Learn How to Program 💻" succeed>
                All students seems good at first. By the time going forward it's more to who consistently keep learning
                it. I knew it was going to be an uphill battle from here.
            </Step>
            <Step title="Finish ChiliTomatoNoodle Series I & II" succeed>
                College doesn't really help for me. I know ass about programming, I had to re-learned everything over on
                second/third semester. Lucky that I found this channel that starts my journey to never stop writing
                lines of codes everyday ever since.{" "}
                <a href="https://www.youtube.com/user/ChiliTomatoNoodle">ChiliTomatoNoodle</a>
            </Step>
            <Step title="Learn Touch Typing with Typing Club ⌨️" succeed />
            <Step title="Get into WSL" succeed>
                Just wanted to look pro, I started linux with WSL. Learn how to operate from terminal command. Tried Vim
                for first time and leave it for year for the reason it seems suck initially.
            </Step>
        </ul>
        <Divider />
        <Year>2017</Year>
        <ul>
            <Step title="Study Abroad 🌇" succeed>
                Seems cool at first. Eventually all University provides same shit though. Teach students how to improve
                their balls to talk trash with no skill, Lecturer acts like a pro infront of students, Money over
                education, Student prestige to behave like one better than other, etc.
            </Step>
            <Step title="Graduate High School 🎉 🥳" succeed />
            <Step title="Lowest Physics Score in School 📉" succeed>
                40~ students, 30~ took the test. I decided that I didn’t want to show off myself that I'm a genius man.
                40 questions, I got 37 quetions wrong.
            </Step>
            <Step title="Eligible to Design  " succeed>
                At this year, I proudly said to myself that "I am a designer". Not long since that, I proudly took back
                all my words and decided to shut the f up. And that's everyone's feelings when they found out{" "}
                <a href="https://www.behance.net/">Behance</a>. Photoshop and Illustrator was my playground at a time.
                There wasn't a day without not opening this software.
            </Step>
            <Step title="First Futsal Team ⚽" succeed />
            <Step title="First Basketball Team 🏀" succeed />
        </ul>
        <Divider />
        <Year>2014</Year>
        <ul>
            <Step title="Get a GF">I was suck. She said "no".</Step>
            <Step title="Lowest Math Score in School 📉" succeed>
                This is personal achievement. There were 120+ students. 120+ took the same test, same question, and same
                teacher who thaught. I was super glad that it wasn't hard to find my name on the list, search it from
                below brought the result quickly.
            </Step>
            <Step title="Learn Photoshop" succeed>
                Old day used to be full with facebook games (Car Town, Social City, etc.). Somehow I found out that
                designing was interesting. Back then when youtube was not full of those content creators, the only way
                to learn is from web and Photoshop docs itself. Remember bookmarking a blog? Pepperidge farm remembers.
            </Step>
        </ul>
        <Divider />
        <Year>2011</Year>
        <ul>
            <Step title="High Jump Winner in City" succeed>
                Those people who compete were so vegetable that they couldn't even jump more that 1 Meter.
            </Step>
            <Step title="High Jump Winner in Province">
                At the same year, to compete even further, now I'm the vegetable.
            </Step>
        </ul>
        <Divider />
        <Year>2010</Year>
        <ul>
            <Step title="#1 in Class for First Ever" succeed>
                Never in my life to be in a class with full of dumbs. I couldn't even believe myself at a time.
            </Step>
            <Step title="#1 in Class for Second Time">
                Unfortunately to be #1 can only persist for one semester. But since the class was still full of those
                dumbs, can't believe still got a chance to be on the top 5.
            </Step>
        </ul>
        <Divider />
        <Year>2008</Year>
        <ul>
            <Step title="First Computer" succeed>
                One computer to all members in the family. Windows XP with the spirit of banger from Winamp. The only
                reason the fat man (god father) bought it just so the kids can learn English from a DVD player (weird
                huh? but that's what boomer did and now I'm greatful)
            </Step>
        </ul>
        <Divider />
        <Year>2005</Year>
        <ul>
            <Step title="Passing First Grade">
                Yes, seems really not normal to many people but I failed first grade.
            </Step>
        </ul>
        <Divider />
        <Year>1999</Year>
        <ul>
            <Step title="Born 👶🏼🍼" succeed />
        </ul>
        <Divider />
        <Year>1998</Year>
        <ul>
            <Step title="👉👌💦" succeed>
                Mistakenly a married couple find in love one another and forgot to put on a condom.
            </Step>
        </ul>
    </>
);

export default function Timeline() {
    const [isShowingFullTimeline, showFullTimeline] = useState(false);

    return (
        <>
            <h2>📆 Timeline</h2>
            <Year>2021</Year>
            <ul>
                <Step title="Graduate University 🎓" succeed>
                    Finally get rid of those salty, unskillful, arrogant lecturers 🎉.
                </Step>
                <Step title="Learn Fastify" succeed />
                <Step title="Get Onboard with Knowt 💼" succeed>
                    A post on Reddit attracted them to get me on board with them :).
                </Step>
                <Step title="Migrate to Arch Linux " succeed>
                    Previously using Manjaro dual boot with Windows. Unfortunately Manjaro doesn't really seem to
                    "just-work". Migrate to Arch, Love it! Arch+i3wm now and it's perfect.
                </Step>
                <Step title="This Blog Made" succeed>
                    This blog is my first fullstack web project with an additional custom made fullstack CMS. Learned
                    many things that step up the level on how to boost performance and handle to deployment. All this
                    things to the production level.
                </Step>
                <Step title="HeckarNews - Hacker News Clone" succeed>
                    A fullstack project just like this blog itself but with even more features implemented as a real
                    website out there is built: handle reset password by email, search functionality within site, and
                    many more. <a href="https://forum.krehwell.com/">HeckarNews</a>
                </Step>
                <Step title="10FastFingers - Average 71 WPM 💫" succeed />
                <Step title="Learn Next.js" succeed />
                <Step title="Learn Nest.js" succeed />
                <Step title="Contribute to Open-source שׂ" succeed>
                    Small salvation but worth to start. Started contributing on Vim plugin. I'm happy that most of thing
                    I contributed is the things that I found it disturbing.
                </Step>
                <Step title="Boomermath Made 💣" succeed>
                    Made with some of the dudes. So much satisfaction doing the project. Probably a bad game for many
                    people but the feeling on how to finish it is so so super breathtaking moment.{" "}
                    <a href="https://gitlab.com/krehwell/boomermath">Boomermath</a> 💞 💖 💕
                </Step>
            </ul>
            <Divider />
            <Year>2020</Year>
            <ul>
                <Step title="Interned at Cool Code as Game Developer 🎮" succeed>
                    Cool right? yes <a href="https://coolcode.my/">Cool Code</a>. So glad that this company cater all
                    interns so well. Having the experience in real working environment is so essential especially with
                    contributing to the company in making their main project as well.
                </Step>
                <Step title="Finished freeCodeCamp - Front End Development Libraries " succeed />
                <Step title="Finished freeCodeCamp - Data Visualization 📈" succeed />
                <Step title="Finished freeCodeCamp - APIs and Microservices " succeed />
                <Step title="10FastFingers - Average 65 WPM 💫" succeed />
                <Step title="First WebRTC" succeed>
                    <a href="https://callntol.vercel.app/">CallnTol</a> exists. One of first web project that enables
                    Call, Send Message, & Video Call.
                </Step>
                <Step title="Learn Typescript ﯤ" succeed />
                <Step title="Re-Learn MySQL " succeed />
                <Step title="Complete Algorithms Solving on Advent of Code" succeed />
            </ul>
            <Divider />
            <Year>2019</Year>
            <ul>
                <Step title="Get Into Web" succeed>
                    <a href="https://freecodecamp.org/">freeCodeCamp</a> helps much in stepping up to the next level.
                    College Web programming course doesn't seem relevant anymore with current modern Web. Yes, I know
                    they will say that the most important is the technique. But still saying that can also mean it is
                    just same with teaching adobe flash to student.
                </Step>
                <Step title="Finished freeCodeCamp - Responsive Web Design" succeed />
                <Step title="Finished freeCodeCamp - JavaScript(ES6) Algorithms and Data Structures" succeed />
                <Step title="Get Into Game Development " succeed />
                <Step title="Multithread with Java " succeed>
                    Sounds trivial. But I really am learning a lot by making a multithread cafe-simulation program. It
                    teaches so many things on how to handle one basic problem but complicated in solving. How to handle
                    the program flow, the responsibility of each object, connection between the relational object from
                    different thread, deadlock, and many more. The most important is the convertability of this skills
                    to be transfered to other field such making game or even requesting data from API in Web.
                </Step>
                <Step title="Vim+tmux as Main Editor 💎" succeed>
                    When it comes to development workflow, nothing beats Vim() so far. Until the day I found tmux, both
                    being my go to choices in making any project, even for Unity development. Combined with HHKB, I feel
                    blessed to be alive ❤️💖.
                </Step>
                <Step title="10FastFingers - Average 50 WPM 💫" succeed />
            </ul>
            {isShowingFullTimeline ? (
                <FullTimeline />
            ) : (
                <button type="button" onClick={() => showFullTimeline(true)}>
                    See More
                </button>
            )}
        </>
    );
}
