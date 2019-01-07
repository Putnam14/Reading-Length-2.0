import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import Search from './Search'
import TestStyles from './styles/TestStyles'

const samples = {
  ttopr: {
    title: 'The Tale of Peter Rabbit',
    browserTitle: 'WPM Test for Elementary Text',
    level: 'Easy or Elementary',
    isbn: '0723267693',
    sample: `<p>Once upon a time there were four little Rabbits, and their names were—Flopsy, Mopsy, Cotton-tail, and Peter. They lived with their Mother in a sand-bank, underneath the root of a very big fir-tree.</p>
    <p>‘Now my dears,’ said old Mrs. Rabbit one morning, ‘you may go into the fields or down the lane, but don’t go into Mr. McGregor’s garden: your Father had an accident there; he was put in a pie by Mrs. McGregor. Now run along, and don’t get into mischief. I am going out.’ Then old Mrs. Rabbit took a basket and her umbrella, and went through the wood to the baker’s. She bought a loaf of brown bread and five currant buns.</p>
    <p>Flopsy, Mopsy, and Cotton-tail, who were good little bunnies, went down the lane to gather blackberries: But Peter, who was very naughty, ran straight away to Mr. McGregor’s garden, and squeezed under the gate! First he ate some lettuces and some French beans; and then he ate some radishes; And then, feeling rather sick, he went to look for some parsley. But round the end of a cucumber frame, whom should he meet but Mr. McGregor!</p>
    <p>Mr. McGregor was on his hands and knees planting out young cabbages, but he jumped up and ran after Peter, waving a rake and calling out, ‘Stop thief!’ Peter was most dreadfully frightened; he rushed all over the garden, for he had forgotten the way back to the gate. He lost one of his shoes among the cabbages, and the other shoe amongst the potatoes. After losing them, he ran on four legs and went faster, so that I think he might have got away altogether if he had not unfortunately run into a gooseberry net, and got caught by the large buttons on his jacket. It was a blue jacket with brass buttons, quite new. Peter gave himself up for lost, and shed big tears; but his sobs were overheard by some friendly sparrows, who flew to him in great excitement, and implored him to exert himself.</p>
    <p>Mr. McGregor came up with a sieve, which he intended to pop upon the top of Peter; but Peter wriggled out just in time, leaving his jacket behind him. And rushed into the tool-shed, and jumped into a can. It would have been a beautiful thing to hide in, if it had not had so much water in it. Mr. McGregor was quite sure that Peter was somewhere in the tool-shed, perhaps hidden underneath a flower-pot. He began to turn them over carefully, looking under each.</p>
    <p>Presently Peter sneezed—’Kertyschoo!’ Mr. McGregor was after him in no time. And tried to put his foot upon Peter, who jumped out of a window, upsetting three plants. The window was too small for Mr. McGregor, and he was tired of running after Peter. He went back to his work.</p>
    <p>Peter sat down to rest; he was out of breath and trembling with fright, and he had not the least idea which way to go. Also he was very damp with sitting in that can. After a time he began to wander about, going lippity—lippity—not very fast, and looking all round. He found a door in a wall; but it was locked, and there was no room for a fat little rabbit to squeeze underneath. An old mouse was running in and out over the stone doorstep, carrying peas and beans to her family in the wood. Peter asked her the way to the gate, but she had such a large pea in her mouth that she could not answer. She only shook her head at him. Peter began to cry.</p>
    <p>Then he tried to find his way straight across the garden, but he became more and more puzzled. Presently, he came to a pond where Mr. McGregor filled his water-cans. A white cat was staring at some gold-fish, she sat very, very still, but now and then the tip of her tail twitched as if it were alive. Peter thought it best to go away without speaking to her; he had heard about cats from his cousin, little Benjamin Bunny. He went back towards the tool-shed, but suddenly, quite close to him, he heard the noise of a hoe—scr-r-ritch, scratch, scratch, scritch. Peter scuttered underneath the bushes. But presently, as nothing happened, he came out, and climbed upon a wheelbarrow and peeped over. The first thing he saw was Mr. McGregor hoeing onions. His back was turned towards Peter, and beyond him was the gate! Peter got down very quietly off the wheelbarrow; and started running as fast as he could go, along a straight walk behind some black-currant bushes.</p>`,
  },
  tpodg: {
    title: 'The Picture of Dorian Gray',
    browserTitle: 'WPM Test for High School Text',
    level: 'Moderate or High School',
    isbn: '0486278077',
    sample: `<p>The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.</p>
    <p>From the corner of the divan of Persian saddle-bags on which he was lying, smoking, as was his custom, innumerable cigarettes, Lord Henry Wotton could just catch the gleam of the honey-sweet and honey-coloured blossoms of a laburnum, whose tremulous branches seemed hardly able to bear the burden of a beauty so flamelike as theirs; and now and then the fantastic shadows of birds in flight flitted across the long tussore-silk curtains that were stretched in front of the huge window, producing a kind of momentary Japanese effect, and making him think of those pallid, jade-faced painters of Tokyo who, through the medium of an art that is necessarily immobile, seek to convey the sense of swiftness and motion. The sullen murmur of the bees shouldering their way through the long unmown grass, or circling with monotonous insistence round the dusty gilt horns of the straggling woodbine, seemed to make the stillness more oppressive. The dim roar of London was like the bourdon note of a distant organ.</p>
    <p>In the centre of the room, clamped to an upright easel, stood the full-length portrait of a young man of extraordinary personal beauty, and in front of it, some little distance away, was sitting the artist himself, Basil Hallward, whose sudden disappearance some years ago caused, at the time, such public excitement and gave rise to so many strange conjectures.</p>
    <p>As the painter looked at the gracious and comely form he had so skilfully mirrored in his art, a smile of pleasure passed across his face, and seemed about to linger there. But he suddenly started up, and closing his eyes, placed his fingers upon the lids, as though he sought to imprison within his brain some curious dream from which he feared he might awake.</p>
    <p>“It is your best work, Basil, the best thing you have ever done,” said Lord Henry languidly. “You must certainly send it next year to the Grosvenor. The Academy is too large and too vulgar. Whenever I have gone there, there have been either so many people that I have not been able to see the pictures, which was dreadful, or so many pictures that I have not been able to see the people, which was worse. The Grosvenor is really the only place.”</p>
    <p>“I don’t think I shall send it anywhere,” he answered, tossing his head back in that odd way that used to make his friends laugh at him at Oxford. “No, I won’t send it anywhere.”</p>
    <p>Lord Henry elevated his eyebrows and looked at him in amazement through the thin blue wreaths of smoke that curled up in such fanciful whorls from his heavy, opium-tainted cigarette. “Not send it anywhere? My dear fellow, why? Have you any reason? What odd chaps you painters are! You do anything in the world to gain a reputation. As soon as you have one, you seem to want to throw it away. It is silly of you, for there is only one thing in the world worse than being talked about, and that is not being talked about. A portrait like this would set you far above all the young men in England, and make the old men quite jealous, if old men are ever capable of any emotion.”</p>
    <p>“I know you will laugh at me,” he replied, “but I really can’t exhibit it. I have put too much of myself into it.”</p>
    <p>Lord Henry stretched himself out on the divan and laughed.</p>
    <p>“Yes, I knew you would; but it is quite true, all the same.”</p>
    <p>“Too much of yourself in it! Upon my word, Basil, I didn’t know you were so vain; and I really can’t see any resemblance between you, with your rugged strong face and your coal-black hair, and this young Adonis, who looks as if he was made out of ivory and rose-leaves. Why, my dear Basil, he is a Narcissus, and you—well, of course you have an intellectual expression and all that. But beauty, real beauty, ends where an intellectual expression begins. Intellect is in itself a mode of exaggeration, and destroys the harmony of any face. The moment one sits down to think, one becomes all nose, or all forehead, or something horrid. Look at the successful men in any of the learned professions. How perfectly hideous they are! Except, of course, in the Church. But then in the Church they don’t think. A bishop keeps on saying at the age of eighty what he was told to say when he was a boy of eighteen, and as a natural consequence he always looks absolutely delightful. Your mysterious young friend, whose name you have never told me, but whose picture really fascinates me, never thinks. I feel quite sure of that. He is some brainless beautiful creature who should be always here in winter when we have no flowers to look at, and always here in summer when we want something to chill our intelligence. Don’t flatter yourself, Basil: you are not in the least like him.”</p>`,
  },
  atotc: {
    title: 'A Tale of Two Cities',
    browserTitle: 'WPM Test for Collegiate Text',
    level: 'Hard or Collegiate',
    isbn: '1503219704',
    sample: `<p>There were a king with a large jaw and a queen with a plain face, on the throne of England; there were a king with a large jaw and a queen with a fair face, on the throne of France. In both countries it was clearer than crystal to the lords of the State preserves of loaves and fishes, that things in general were settled for ever.</p>
    <p>It was the year of Our Lord one thousand seven hundred and seventy-five. Spiritual revelations were conceded to England at that favoured period, as at this. Mrs. Southcott had recently attained her five-and-twentieth blessed birthday, of whom a prophetic private in the Life Guards had heralded the sublime appearance by announcing that arrangements were made for the swallowing up of London and Westminster. Even the Cock-lane ghost had been laid only a round dozen of years, after rapping out its messages, as the spirits of this very year last past (supernaturally deficient in originality) rapped out theirs. Mere messages in the earthly order of events had lately come to the English Crown and People, from a congress of British subjects in America: which, strange to relate, have proved more important to the human race than any communications yet received through any of the chickens of the Cock-lane brood.</p>
    <p>France, less favoured on the whole as to matters spiritual than her sister of the shield and trident, rolled with exceeding smoothness down hill, making paper money and spending it. Under the guidance of her Christian pastors, she entertained herself, besides, with such humane achievements as sentencing a youth to have his hands cut off, his tongue torn out with pincers, and his body burned alive, because he had not kneeled down in the rain to do honour to a dirty procession of monks which passed within his view, at a distance of some fifty or sixty yards. It is likely enough that, rooted in the woods of France and Norway, there were growing trees, when that sufferer was put to death, already marked by the Woodman, Fate, to come down and be sawn into boards, to make a certain movable framework with a sack and a knife in it, terrible in history. It is likely enough that in the rough outhouses of some tillers of the heavy lands adjacent to Paris, there were sheltered from the weather that very day, rude carts, bespattered with rustic mire, snuffed about by pigs, and roosted in by poultry, which the Farmer, Death, had already set apart to be his tumbrils of the Revolution. But that Woodman and that Farmer, though they work unceasingly, work silently, and no one heard them as they went about with muffled tread: the rather, forasmuch as to entertain any suspicion that they were awake, was to be atheistical and traitorous.</p>
    <p>In England, there was scarcely an amount of order and protection to justify much national boasting. Daring burglaries by armed men, and highway robberies, took place in the capital itself every night; families were publicly cautioned not to go out of town without removing their furniture to upholsterers’ warehouses for security; the highwayman in the dark was a City tradesman in the light, and, being recognised and challenged by his fellow-tradesman whom he stopped in his character of “the Captain,” gallantly shot him through the head and rode away; the mail was waylaid by seven robbers, and the guard shot three dead, and then got shot dead himself by the other four, “in consequence of the failure of his ammunition:” after which the mail was robbed in peace; that magnificent potentate, the Lord Mayor of London, was made to stand and deliver on Turnham Green, by one highwayman, who despoiled the illustrious creature in sight of all his retinue; prisoners in London gaols fought battles with their turnkeys, and the majesty of the law fired blunderbusses in among them, loaded with rounds of shot and ball; thieves snipped off diamond crosses from the necks of noble lords at Court drawing-rooms; musketeers went into St. Giles’s, to search for contraband goods, and the mob fired on the musketeers, and the musketeers fired on the mob, and nobody thought any of these occurrences much out of the common way. In the midst of them, the hangman, ever busy and ever worse than useless, was in constant requisition; now, stringing up long rows of miscellaneous criminals; now, hanging a housebreaker on Saturday who had been taken on Tuesday; now, burning people in the hand at Newgate by the dozen, and now burning pamphlets at the door of Westminster Hall; to-day, taking the life of an atrocious murderer, and to-morrow of a wretched pilferer who had robbed a farmer’s boy of sixpence.</p>`,
  },
  template: {
    title: 'Title',
    browserTitle: 'WPM Test for...',
    level: 'level',
    isbn: 'ISBN-10',
    sample: `HTML for sample`,
  },
}

class WPMTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      wpm: 0,
      wordcount: samples[props.id].sample.match(/\S+/g).length,
    }
  }

  setBeginTime = () => this.setState({ time: new Date() })

  calcWPM = () => {
    const { time, wordcount } = this.state
    const timeDiff = (new Date() - time) / 60000
    const wpm = Math.floor(wordcount / timeDiff)
    this.setState({ wpm })
  }

  resetCalc = () => {
    this.setState({ time: 0, wpm: 0 })
  }

  render() {
    const { id } = this.props
    const { title, browserTitle, level, sample } = samples[id]
    const { wpm, wordcount } = this.state
    return (
      <div>
        <Search />
        <Link href="/wpm">
          <a>Back to list of WPM calculators</a>
        </Link>
        {title ? (
          <TestStyles>
            <Head>
              <title>{browserTitle} | Reading Length</title>
            </Head>
            <h1>{title}</h1>
            <p>Reading level: {level}</p>
            <p>Word count: {wordcount}</p>
            <div className="panel">
              <div className="panel-heading">
                <p className="panel-title">Time my reading</p>
              </div>
              <div className="panel-body">
                <p>
                  To calculate your words per minute (WPM) reading speed, click
                  the 'Start reading' button and read the sample text below.
                </p>
                <p>
                  When you are done reading, click the 'Stop and calculate'
                  button.
                </p>
                <hr />
                <div className="sample-text">
                  <button type="button" onClick={this.setBeginTime}>
                    Click here to start reading
                  </button>
                  <div dangerouslySetInnerHTML={{ __html: sample }} />
                  <button className="calc" type="button" onClick={this.calcWPM}>
                    Stop and calculate
                  </button>
                </div>
                {wpm !== 0 && (
                  <div id="CalcWPM" className="panel-footer">
                    <p className="text-center">
                      You read this over an average of {wpm} words per minute.
                      Great job!
                    </p>
                    <p>
                      <button type="button" onClick={this.resetCalc}>
                        Reset
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TestStyles>
        ) : (
          <>
            <p>Sorry, we couldn't find that reading sample.</p>
          </>
        )}
      </div>
    )
  }
}

export default WPMTest
