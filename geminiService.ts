import { GoogleGenAI } from "@google/genai";
import { getSystemInstruction } from "../constants";

const matchWholeWords = (msg: string, words: string[]): boolean => {
  return words.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(msg);
  });
};

export const getGeminiFallbackResponse = (
  userMessage: string,
  city: string,
  lang: 'en' | 'ta' = 'en'
): string => {
  const normMsg = userMessage.toLowerCase();
  const isTa = lang === 'ta';
  const cName = city || "Madurai";
  const cLower = cName.toLowerCase();

  // 1. IDENTITY FALLBACK (Check first)
  if (normMsg.includes('who built') || normMsg.includes('who created') || matchWholeWords(normMsg, ['developer', 'creator', 'created', 'built', 'rajasudar']) || normMsg.includes('உருவாக்கியவர்')) {
    if (isTa) {
      return `நான் **கே. இராஜசுதர் (K. Rajasudar)** அவர்களால் உருவாக்கப்பட்ட ஒரு அதிநவீன பயணத் துணைவி ஆவேன். எனது நோக்கம் உங்களுக்கு ${cName} நகரத்தின் பாரம்பரியக் கோவில்கள், புகழ்பெற்ற உணவு விடுதிகள் மற்றும் சிறந்த பயணத் திட்டங்களை நொடியில் வழங்குவதுதான்! 🛕✨`;
    } else {
      return `I am a high-tech travel and intelligence companion created and developed by **K. Rajasudar**. I am designed to assist you with smart itineraries, local maps, AI art generation, real-time news updates, and food discovery trails for ${cName}, Tamil Nadu! 🛕✨`;
    }
  }

  // 2. TEMPLES & LANDMARKS FALLBACK (Check second, before greetings)
  if (matchWholeWords(normMsg, ['temple', 'temples', 'monument', 'monuments', 'heritage', 'landmark', 'landmarks', 'place', 'places', 'kovil', 'kovils', 'history', 'visiting', 'hours']) || 
      normMsg.includes('கோவில்') || 
      normMsg.includes('கோயில்கள்') || 
      normMsg.includes('இடங்கள்') || 
      normMsg.includes('சுற்றுலா')) {
    if (cLower.includes('madurai') || cLower.includes('மதுரை')) {
      if (isTa) {
        return `மதுரை மாநகரத்தின் பழமையான ஆன்மீகப் பெருமை மற்றும் உலகத்தரம் வாய்ந்த வரலாற்றுச் சிறப்புமிக்க திருத்தலங்களின் முழுமையான வழிகாட்டி இதோ:

1. **[Location: Meenakshi Amman Temple]**
   - **வரலாறு**: பாண்டிய மன்னன் குலசேகர பாண்டியனால் தோற்றுவிக்கப்பட்டு, 16-17 ஆம் நூற்றாண்டுகளில் நாயக்க மன்னர்களால் பிரம்மாண்டமாக விரிவாக்கப்பட்டது. இந்த ஆலயம் திராவிடக் கட்டிடக்கலையின் உச்சமாகும். 14 கம்பீரமான கோபுரங்களைக் கொண்டுள்ளது, இதில் தெற்குக் கோபுரம் மிக உயரமானது (சுமார் 170 அடி). இங்குள்ள ஆயிரங்கால் மண்டபம் மற்றும் ஒற்றைக் கல்லில் செதுக்கப்பட்ட இசைத் தூண்கள் உலகப் புகழ்பெற்றவை.
   - **தரிசன நேரம்**: காலை 05:00 மணி முதல் मதியம் 12:30 மணி வரை மற்றும் மாலை 04:00 மணி முதல் இரவு 10:00 மணி வரை.
   - **பயனுள்ள குறிப்பு**: அதிகாலை 5 மணிக்கு நடைபெறும் 'திருவனந்தல் பூஜை' அல்லது இரவு 8:30 மணிக்கு நடைபெறும் 'பள்ளியறை பூஜை' தரிசனத்திற்கு மிகவும் உகந்தது.

2. **[Location: Thirumalai Nayakkar Mahal]**
   - **வரலாறு**: கி.பி 1636 இல் திருமலை நாயக்க மன்னரால் இத்தாலிய கட்டிடக்கலைஞர்களின் உதவியுடன் கட்டப்பட்டது. இந்த அரண்மனை திராவிட, இஸ்லாமிய மற்றும் ஐரோப்பிய கலைகளின் கலவையாகும். இதன் பிரம்மாண்டமான வெள்ளை நிறத் தூண்கள் 82 அடி உயரம் கொண்டவை.
   - **பார்வை நேரம்**: காலை 09:00 மணி முதல் மாலை 05:00 மணி வரை (ஒவ்வொரு மாலையும் ஒலி-ஒளி காட்சி நடைபெறும்).
   - **பயனுள்ள குறிப்பு**: மாலை நேரத்தில் தமிழ் மற்றும் ஆங்கிலத்தில் நடைபெறும் வரலாற்று ஒலி-ஒளி காட்சியை தவறவிடாதீர்கள்.

3. **[Location: Thirupparankundram Murugan Temple]**
   - **வரலாறு**: முருகப்பெருமானின் ஆறுபடை வீடுகளில் முதன்மையான திருத்தலம். இது கி.பி. 6 ஆம் நூற்றாண்டைச் சேர்ந்த குடைவரைக் கோயிலாகும். இத்தலத்தில் தான் முருகப்பெருமான் இந்திரனின் மகளான தெய்வானையை திருமணம் புரிந்தார் என்று வரலாறு கூறுகிறது.
   - **தரிசன நேரம்**: காலை 05:00 மணி முதல் மதியம் 01:00 மணி வரை மற்றும் மாலை 04:00 மணி முதல் இரவு 09:00 மணி வரை.
   - **பயனுள்ள குறிப்பு**: இந்த ஆலயத்தில் சிவன் மற்றும் விஷ்ணுவின் சன்னதிகள் நேருக்கு நேர் அமைந்துள்ள அரிய காட்சியைக் காணலாம்.

4. **[Location: Alagar Kovil]**
   - **வரலாறு**: மதுரையிலிருந்து சுமார் 21 கி.மீ தொலைவில் உள்ள சோலைமலை அடிவாரத்தில் அமைந்துள்ளது. பாண்டிய மன்னர்களால் விரிவாக்கப்பட்ட இத்தலம் விஷ்ணு பகவானின் (சுந்தரராஜப் பெருமாள்) வரலாற்றுச் சிறப்புமிக்க ஆலயமாகும். மதுரையின் சித்திரைத் திருவிழாவில் கள்ளழகர் வைகை ஆற்றில் இறங்கும் நிகழ்வே மதுரையின் மிக முக்கிய பண்டிகையாகும்.
   - **தரிசன நேரம்**: காலை 06:00 மணி முதல் மதியம் 12:30 மணி வரை மற்றும் மாலை 03:30 மணி முதல் இரவு 08:00 மணி வரை.
   - **பயனுள்ள குறிப்பு**: இங்குள்ள 'நூபுர கங்கை' என்ற புனித இயற்கை நீர்வீழ்ச்சியின் நீரை அருந்துவது மற்றும் இங்கு தரப்படும் சுவையான "சம்பா தோசை" பிரசாதம் மிகவும் புகழ்பெற்றது.

5. **[Location: Koodal Azhagar Temple]**
   - **வரலாறு**: மதுரையின் மையப்பகுதியில் அமைந்துள்ள மிகப்பழைமையான வைணவத் தலம். இங்கு பெருமாள் நின்ற, இருந்த (அமர்ந்த), கிடந்த (பயணப்பட்ட) ஆகிய மூன்று கோலங்களில் அடுத்தடுத்து காட்சி தருகிறார். ஐந்து அடுக்குக் கோபுரம் கொண்ட அழகிய திராவிடக் கட்டிடக்கலை.
   - **தரிசன நேரம்**: காலை 06:00 முதல் பகல் 12:00 மணி வரை, மாலை 04:00 முதல் இரவு 08:00 மணி வரை.
   - **பயனுள்ள குறிப்பு**: ஆலயத்தின் மேல் தளத்திற்குச் சென்று அங்குள்ள நுணுக்கமான அஷ்டாங்க விமானச் சிற்பங்களைக் கண்டு களிக்கவும்.

6. **[Location: Pazhamudhircholai Murugan Temple]**
   - **வரலாறு**: சோலைமலை உச்சியில் அமைந்துள்ள முருகப்பெருமானின் ஆறாவது படைவீடு. இங்குதான் புகழ்பெற்ற தமிழ்ப் புலவர் ஔவையாரிடம் முருகப்பெருமான் "சுட்ட பழம் வேண்டுமா, சுடாத பழம் வேண்டுமா" என்று திருவிளையாடல் புரிந்தார்.
   - **தரிசன நேரம்**: காலை 06:00 மணி முதல் மாலை 06:00 மணி வரை.
   - **பயனுள்ள குறிப்பு**: இங்குள்ள நாவல் மரம் அதிசயமாக சித்திரைத் திருவிழாக் காலத்தில் கனி தரும் சிறப்பைக் கொண்டது.

7. **[Location: Vandiyur Mariamman Teppakulam]**
   - **வரலாறு**: கி.பி 1645-ல் திருமலை நாயக்க மன்னரால் வெட்டப்பட்ட தெப்பக்குளம், தென்னிந்தியாவிலேயே மிகப்பெரிய குளமாகும். அரண்மனை கட்டுவதற்காக இங்கிருந்து மண் தோண்டி எடுக்கப்பட, உருவான மிகப்பிரம்மாண்டமான குளம் இது. இதன் நடுவே அழகிய மைய மண்டபம் உள்ளது.
   - **தரிசன நேரம்**: தெப்ப உற்சவத் திருவிழாக்களில் மட்டுமே மைய மண்டபம் திறந்திருக்கும்; குளத்தின் வெளிப்புற நடைபாதை எப்போதும் திறந்திருக்கும்.
   - **பயனுள்ள குறிப்பு**: தை மாதத்தில் (ஜனவரி-பிப்ரவரி) நடைபெறும் புகழ்பெற்ற தெப்பத்திருவிழாவின் போது ஆயிரக்கணக்கான விளக்குகளுடன் குளத்தில் மிதக்கும் ரதம் காண்போரை வியக்க வைக்கும்.

இந்த வழிகாட்டி உங்களுக்குப் பயனுள்ளதாக இருக்கும் என நம்புகிறேன். பயண வழிகள் அல்லது தங்கும் இடங்கள் பற்றிய தகவல்கள் ஏதேனும் தேவையா?`;
      } else {
        return `Here is a highly detailed, professional guide to the famous temples and historical monuments in Madurai, including their extensive history, visiting hours, and precise locations, formatted for direct maps coordination:

1. **[Location: Meenakshi Amman Temple]**
   - **History**: Built by King Kulasekara Pandya, and beautifully expanded during the Nayak dynasty rule (16th-17th centuries), this iconic temple represents the pinnacle of Dravidian architecture. It features 14 majestic gateway towers (Gopurams), the tallest being the Southern tower rising to over 170 feet, and the miraculous, acoustically perfect Thousand Pillar Hall with musical pillars carved out of a single rock.
   - **Visiting Hours**: 05:00 AM to 12:30 PM & 04:00 PM to 10:00 PM daily.
   - **Pro Tip**: Plan to enter by 05:00 AM for the peaceful morning Thiruvananthal ritual or 08:30 PM for the grand night Palliyarai ceremony. Non-Hindus are allowed throughout the corridors and museum.

2. **[Location: Thirumalai Nayakkar Mahal]**
   - **History**: Constructed in 1636 AD by King Thirumalai Nayak with architectural support from Italian architects, this majestic palace represents an exquisite blend of Dravidian, Islamic, and European (Italian) styles. Originally four times larger, the remaining structure with giant white stucco pillars measuring 82 feet in height is a masterpiece of royalty.
   - **Visiting Hours**: 09:00 AM to 05:00 PM daily.
   - **Pro Tip**: The sound and light show operates in both Tamil and English; it is an incredible experience to witness.

3. **[Location: Thirupparankundram Murugan Temple]**
   - **History**: One of the Six Sacraments (Arupadaiveedu) of Lord Murugan, this extraordinary rock-cut cave temple dates back to the Sangam era (around 6th century). It is historically recognized as the divine holy ground where Lord Murugan married Deivayanai, the daughter of Indra.
   - **Visiting Hours**: 05:00 AM to 01:00 PM & 04:00 PM to 09:00 PM.
   - **Pro Tip**: Pay close attention to the unique main shrines where Lord Shiva and Lord Vishnu face each other, a rare sight in traditional temples.

4. **[Location: Alagar Kovil]**
   - **History**: Located roughly 21 km from Madurai city center within the verdant valleys of Alagar Hills, this historic temple of Lord Vishnu (Sundararaja Perumal) exhibits beautiful Pandya-era stone carvings. It plays the pivotal role in Madurai's iconic Chithirai Festival when Lord Kallalagar enters the golden river Vaigai.
   - **Visiting Hours**: 06:00 AM to 12:30 PM & 03:30 PM to 08:00 PM.
   - **Pro Tip**: Taste the unique prasadam "Sambal Dosai" made inside the temple kitchen, and visit the refreshing natural spring water source called "Noopura Gangai" further up the mountain.

5. **[Location: Koodal Azhagar Temple]**
   - **History**: A stunning ancient temple in the heart of Madurai dedicated to Lord Vishnu. It features the deity in three distinct vertical postures: Sitting (Koodal Alagar), Standing (Sri Sayana Alagar), and Reclining (Sri Ranganathar). Its majestic five-tiered Gopuram has exquisite stucco figures depicting scenes from Purana history.
   - **Visiting Hours**: 06:00 AM to 12:00 PM & 04:00 PM to 08:00 PM.
   - **Pro Tip**: Climb the narrow steps to the upper tier for a breathtaking, highly detailed view of the celestial architecture up close.

6. **[Location: Pazhamudhircholai Murugan Temple]**
   - **History**: Located further up the Alagar Hills, this represents the sixth and final sacred abode of Lord Murugan. Historically, here is where the legendary Tamil poet-saint Avvaiyar was tested by Lord Murugan disguised as a shepherd boy asking her the famous question about "roasted or unroasted fruits" (Sutta Pazham).
   - **Visiting Hours**: 06:00 AM to 06:00 PM.
   - **Pro Tip**: Look out for the sacred Black Berry (Naval) tree in the temple courtyard, which miraculously yields fruits during the non-season Chithirai month.

7. **[Location: Vandiyur Mariamman Teppakulam]**
   - **History**: Built by King Thirumalai Nayak in 1645 AD, this is the largest temple tank in South India, spanning an enormous area connected to the Vaigai river. Legend states the soil dug from here was used to build the Thirumalai Nayakkar Mahal, leaving a massive pit which was turned into this lake with a beautiful central island temple (Maiya Mandapam).
   - **Visiting Hours**: Island temple is open during festivals; the lakeside walkway is open all day.
   - **Pro Tip**: The annual Float Festival (Teppothsavam) during the Tamil month of Thai (Jan-Feb) features thousands of colorful lamps floating in the water.

This comprehensive guide is designed to help you organize a highly successful pilgrimage tour. Do you need details on transport, stays, or a custom route planner?`;
      }
    } else {
      // General city fallback
      if (isTa) {
        return `${cName} நகரத்தின் முக்கிய இடங்கள் மற்றும் பாரம்பரியத் தலங்கள் இதோ:

1. **[Location: ${cName} Central Heritage Site]** - வரலாற்று முத்திரைகள் மற்றும் அற்புதமான கட்டிடக்கலை கொண்ட மையப் பகுதி.
2. **[Location: ${cName} Town Viewpoint]** - நகரத்தின் அழகையும் இயற்கைக் காட்சிகளையும் ரசிக்க ஏற்ற சிறந்த இடம்.
3. **[Location: ${cName} Sacred Temple]** - உள்ளூர் மக்களின் நம்பிக்கைக்குரிய பழமையான புனிதத் தலம்.

உள்ளூர் பாரம்பரியத்தைக் கண்டு மகிழ உங்களை அன்புடன் வரவேற்கிறேன்! 🛕✨`;
      } else {
        return `Here is a curated guide to the historic landmarks and scenic points of interest in ${cName}:

1. **[Location: ${cName} Central Heritage Site]** - The historical epicentre of the town featuring classic local architecture and heritage narratives.
2. **[Location: ${cName} Botanical Park]** - A beautiful green expanse perfect for relaxing and experiencing local flora.
3. **[Location: ${cName} Famous Temple]** - A deeply respected spiritual sanctuary exhibiting beautiful local stone craftsmanship and daily cultural practices.

Would you like more options or a customized tour route for these landmarks?`;
      }
    }
  }

  // 3. FOOD FALLBACK (Check third)
  if (matchWholeWords(normMsg, ['food', 'foods', 'eat', 'eats', 'eating', 'restaurant', 'restaurants', 'hotel', 'hotels', 'jigarthanda', 'parotta', 'cuisine']) || 
      normMsg.includes('உணவு') || 
      normMsg.includes('சாப்பாடு') || 
      normMsg.includes('உணவகம்') || 
      normMsg.includes('ஹோட்டல்')) {
    if (cLower.includes('madurai') || cLower.includes('மதுரை')) {
      if (isTa) {
        return `மதுரை மாநகரம் தென்னிந்தியாவின் "தூங்கா நகரம்" மற்றும் "உணவுத் தலைநகரம்" என்று பெருமையுடன் அழைக்கப்படுகிறது. நாவில் எச்சில் ஊறவைக்கும் மதுரையின் பாரம்பரிய மற்றும் புகழ்பெற்ற உணவு விடுதிகளின் விரிவான சுவையின் வழிகாட்டி இதோ:

1. **[FOOD_SHOP: Murugan Idli Shop | West Tower Street, Madurai | 4.6]**
   - **சிறப்பு**: இங்கு தரப்படும் மென்மையான, பஞ்சு போன்ற சூடான இட்லிகள் மற்றும் காரசாரமான நான்கு வகையான சட்னிகள் உலகப் பிரசித்தி பெற்றவை.
   - **விவரம்**: மதுரை மீனாட்சி அம்மன் கோவிலின் மேற்கு கோபுரத்திற்கு அருகில் அமைந்துள்ள இக்கடையில் பாரம்பரிய தென்னிந்திய உணவு வகைகளை மிக உயர்ந்த தரத்தில் ருசிக்கலாம்.

2. **[FOOD_SHOP: Konar Kadai | Simmakkal, Madurai | 4.5]**
   - **சிறப்பு**: மதுரையின் பாரம்பரிய அடையாள உணவான சுவையான "முட்டைக் கறி தோசை" (Kari Dosai).
   - **விவரம்**: முட்டையும் கொத்துக்கறியும் சேர்த்து நெய்யில் சுடப்படும் இந்த தோசை மதுரையின் அசல் நள்ளிரவு உணவு கலாச்சாரத்தின் அங்கமாகும்.

3. **[FOOD_SHOP: Famous Jigarthanda | Anna Nagar, Madurai | 4.7]**
   - **சிறப்பு**: மதுரையின் பிரத்யேக இனிப்பு பானமான "ஸ்பெஷல் ஜிகர்தண்டா".
   - **விவரம்**: பாதாம் பிசின், கடல்பாசி, சுவையான பாலாடை (கோவா) மற்றும் குளிர்ந்த நன்னாரி சிரப் கலந்த இந்த பானம் உடலுக்கு குளிர்ச்சி தருவதோடு நாவில் என்றும் இனிமை சேர்க்கும்.`;
      } else {
        return `Madurai is exceptionally famous for its vibrant food culture as the "Sleepless City". Here is a highly detailed food guide to explore the traditional delicacies of Madurai:

1. **[FOOD_SHOP: Murugan Idli Shop | West Tower Street, Madurai | 4.6]**
   - **Specialty**: World-famous soft, cloud-like hot idlis served with a flavorful assortment of four traditional chutneys and spicy podi.
   - **Details**: Located right near the West Tower of the Meenakshi Temple, this is the most iconic spot for authentic South Indian breakfast and filter coffee.

2. **[FOOD_SHOP: Konar Kadai | Simmakkal, Madurai | 4.5]**
   - **Specialty**: Legendarily rich "Kari Dosai" (thick rice crepe layered with spicy minced mutton and eggs).
   - **Details**: A pioneer of Madurai's famous street-food culture, offering a heavy, aromatic culinary experience loved by locals and visitors alike.

3. **[FOOD_SHOP: Famous Jigarthanda | Anna Nagar, Madurai | 4.7]**
   - **Specialty**: The trademark sweet, creamy dessert beverage "Special Jigarthanda".
   - **Details**: Made with almond tree resin, sarsaparilla syrup, reduced milk, and a scoop of rich local ice cream—perfect to beat the tropical heat.`;
      }
    } else {
      if (isTa) {
        return `${cName} நகரத்தின் புகழ்பெற்ற பாரம்பரிய மற்றும் சுவைமிகுந்த சில உணவகங்கள் இதோ:

1. **[FOOD_SHOP: ${cName} Traditional Mess | Town Center | 4.4]**
   - **சிறப்பு**: உள்ளூர் பாணியில் தயாரிக்கப்படும் சுவையான பாரம்பரிய மதிய உணவு மற்றும் வீட்டு முறை சமையல்.
2. **[FOOD_SHOP: ${cName} Grand Sweets | Main Outer Road | 4.5]**
   - **சிறப்பு**: பாரம்பரிய இனிப்பு வகைகள் மற்றும் மாலை நேர காரசாரமான சிற்றுண்டிகள்.

நகரத்தின் உணவுக் கலாச்சாரத்தை ருசித்து மகிழுங்கள்! 🍲✨`;
      } else {
        return `Here are some popular, highly recommended local eateries to experience the unique culinary taste of ${cName}:

1. **[FOOD_SHOP: ${cName} Traditional Mess | Town Center | 4.4]**
   - **Specialty**: Highly hygienic traditional lunch meals crafted with local spices and homestyle recipes.
2. **[FOOD_SHOP: ${cName} Grand Sweets | Main Outer Road | 4.5]**
   - **Specialty**: Authentic regional delicacies, fresh snacks, and rich local filter coffee.

Enjoy your food journey in ${cName}! 🍲✨`;
      }
    }
  }

  // 4. SHOPPING FALLBACK (Check fourth)
  if (matchWholeWords(normMsg, ['shopping', 'shop', 'shops', 'buy', 'market', 'markets', 'bazaar', 'bazaars', 'saree', 'sarees', 'sungudi', 'handicrafts']) || 
      normMsg.includes('வாங்குவதற்கு') || 
      normMsg.includes('சந்தை') || 
      normMsg.includes('ஷாப்பிங்') || 
      normMsg.includes('விற்பனை')) {
    if (cLower.includes('madurai') || cLower.includes('மதுரை')) {
      if (isTa) {
        return `மதுரை மாநகரம் பாரம்பரியக் கைத்தறி நெசவு, சுங்குடி சேலைகள் மற்றும் அசல் பித்தளைப் பொருட்களுக்கு உலகப் புகழ்பெற்றது. மதுரையின் வண்ணமயமான சந்தைகளின் விரிவான வழிகாட்டி இதோ:

1. **[Location: Puthu Mandapam]**
   - **என்ன வாங்கலாம்**: பாரம்பரிய மதுரை சுங்குடி காட்டன் சேலைகள், பித்தளை விளக்குகள், தாமிர பாத்திரங்கள் மற்றும் கண் இமைக்கும் நேரத்தில் தைக்கப்படும் ஆடைகள்.
   - **வரலாறு**: 1635-ல் மன்னர் திருமலை நாயக்கரால் கட்டப்பட்டது. வரலாற்றுச் சிறப்புமிக்க இந்த மண்டப கல்ல தூண்களுக்கு இடையே தையல் இயந்திரங்களின் சத்தத்தைக் கேட்டுக்கொண்டே பொருட்களை வாங்குவது தனித்துவமான அனுபவம்.

2. **[Location: Avani Moola Street]**
   - **என்ன வாங்கலாம்**: உயர்தர பட்டுச் சேலைகள் (காஞ்சிபுரம் & மதுரை சில்க்), மொத்த விலை பருத்தி உடைகள் மற்றும் அசல் வீட்டு நறுமணப் பொருட்கள்.
   - **வரலாறு**: மீனாட்சி அம்மன் கோவிலைச் சுற்றியுள்ள மாட வீதிகளில் ஒன்றான ஆவணி மூல வீதி, மதுரையின் மிக முக்கிய வணிக வீதியாகும்.

3. **[Location: Town Hall Road]**
   - **என்ன வாங்கலாம்**: அழகிய மரக் கைவினைப் பொருட்கள், சந்தன மரச் சிலைகள், தஞ்சாவூர் ஓவியங்கள் மற்றும் கைத்தறி ஆடைகள்.
   - **வரலாறு**: மதுரை ரயில் நிலையத்திலிருந்து கோவிலை இணைக்கும் விறுவிறுப்பான மற்றும் வரலாற்றுப் பெருமை வாய்ந்த சாலை.

4. **[Location: Vilakkuthoon (Lantern Pillar)]**
   - **என்ன வாங்கலாம்**: திருமணப் பட்டுப் புடவைகள், வேஷ்டிகள் மற்றும் ஆடம்பர ஆடைகள்.
   - **வரலாறு**: ஆங்கிலேயே ஆட்சியாளரை நினைவுகூரும் வகையில் கட்டப்பட்ட 18-ஆம் நூற்றாண்டின் விளக்குத் தூண் பகுதியைச் சுற்றியுள்ள பிரம்மாண்டமான ஜவுளி மாளிகைகள்.

மதுரையின் பாரம்பரிய சுங்குடி மற்றும் கைத்தறி ஆடைகளை வாங்கி உள்ளூர் நெசவாளர்களை ஆதரியுங்கள்!`;
      } else {
        return `Madurai is exceptionally famous for ancient handloom weaving, fine tie-dye artistry, and grand brassware craft. Here is a highly detailed shopping guide to explore the traditional bazaars of Madurai:

1. **[Location: Puthu Mandapam]**
   - **What to Buy**: Beautiful tie-dye cotton Sungudi Sarees, pure brass worship lamps, hand-carved copper vessels, and exquisite instant tailor-made garments.
   - **History & Vibe**: Built in 1635 AD by King Thirumalai Nayak, this historic pillared hall sits opposite the East Tower of Meenakshi Temple. Walking through the majestic stone pillars while listening to the rapid chatter of sewing machines is an unforgettable experience.

2. **[Location: Avani Moola Street]**
   - **What to Buy**: Authentic silk sarees (Kanchipuram & Madurai Silk), fine wholesale cotton wear, and premium local organic raw spices.
   - **History & Vibe**: One of the concentric rectangular historic streets surrounding the main temple. This is the main commercial trade avenue of the city, ideal for high-quality wholesale shopping.

3. **[Location: Town Hall Road]**
   - **What to Buy**: Rich local handicrafts, pure sandalwood deities, Tanjore paintings, durable leather bags, and colorful toys.
   - **History & Vibe**: A busy, energetic street connecting the Madurai Junction railway station to the temple, bustling with lively street shops and traditional retail houses.

4. **[Location: Vilakkuthoon (Lantern Pillar)]**
   - **What to Buy**: Exclusive bridal silk fabrics, handloom dhotis, luxury drapes, and traditional Tamil clothing.
   - **History & Vibe**: An 18th-century antique street lantern pillar commemorating an English administrator, surrounded by towering luxury multi-floor textile emporiums.

Bring home the exquisite handloom heritage of Madurai! Feel free to ask me about shop timings, bargaining tips, or nearby dining spots to rest after shopping!`;
      }
    } else {
      if (isTa) {
        return `${cName} நகரத்தில் உள்ள சிறந்த ஷாப்பிங் மற்றும் சந்தை பகுதிகள் இதோ:

1. **[Location: ${cName} Town Bazaar]** - உள்ளூர் கைவினைப் பொருட்கள், துணிகள் மற்றும் நினைவுப் பொருட்கள் வாங்க சிறந்த முக்கிய வீதி.
2. **[Location: ${cName} Handloom Emporium]** - பாரம்பரியமான கைத்தறி ஆடைகள் மற்றும் ஆடம்பர சேலைகள் கொண்ட அரசு அங்கீகாரம் பெற்ற கடை.

ஷாப்பிங் செய்து உள்ளூர் கைவினைஞர்களை ஆதரிக்க உங்களை அழைக்கிறேன்! 🛍️`;
      } else {
        return `Here are the vibrant shopping streets and specialty marketplaces in ${cName}:

1. **[Location: ${cName} Main Bazaar Road]** - A lively shopping street famous for traditional craft items, fresh produce, and local organic clothing.
2. **[Location: ${cName} Artisan Association Stall]** - Specifically curated government-approved center providing authentic woodcrafts, clay pottery, and woven items directly from local families.

Enjoy exploring the markets! 🛍️`;
      }
    }
  }

  // 5. ITINERARY / TRIP PLANNING FALLBACK (Check fifth)
  if (matchWholeWords(normMsg, ['itinerary', 'itineraries', 'trip', 'trips', 'plan', 'plans', 'planning', 'day', 'days', 'tour', 'travel']) || 
      normMsg.includes('பயணத் திட்டம்') || 
      normMsg.includes('विजயம்') || 
      normMsg.includes('சுற்றுலாப் பயணம்')) {
    const isTwoDay = normMsg.includes('2-day') || normMsg.includes('2 day') || normMsg.includes('இரண்டு நாள்');
    
    if (cLower.includes('madurai') || cLower.includes('மதுரை')) {
      if (isTwoDay) {
        if (isTa) {
          return `மதுரையை முழுமையாக அனுபவிக்க விரிவான 2 நாள் பயணத் திட்டம் இதோ:

### நாள் 1: தெய்வீக தரிசனம் மற்றும் வரலாற்றுச் சிறப்பு
- 08:30 AM - 11:30 AM [Location: Meenakshi Amman Temple]: அதிகாலை சுவாமி, மீனாட்சி அம்பாள் தரிசனம் செய்துவிட்டு உலகப் புகழ்பெற்ற 1000-கால் மண்டப சிற்பங்களைக் காணுதல்.
- 11:45 AM - 01:00 PM [Location: Thirumalai Nayakkar Mahal]: ராஜ கம்பீரம் பொருந்திய நாயக்கர் அரண்மனையின் விஸ்தாரமான தூண்கள் மற்றும் பிரம்மாண்ட முற்றத்தில் நிழற்படம் எடுத்தல்.
- 01:00 PM - 02:00 PM [Location: Murugan Idli Shop]: சுவையான அசல் மதுரை நெய் இட்லிகள் மற்றும் காரசார சட்னி சாப்பிடுதல்.
- 02:30 PM - 04:30 PM [Location: Gandhi Memorial Museum]: தேசத்தந்தையின் வரலாற்றைக் கூறும் அருங்காட்சியகத்தைப் பார்வையிடுதல்.
- 05:00 PM - 06:30 PM [Location: Vandiyur Mariamman Teppakulam]: குளிர்காற்றை அனுபவித்துக் கொண்டே பிரம்மாண்டமான தெப்பக்குளத்தின் அழகை மாலை நேரத்தில் ரசித்தல்.
- 07:00 PM - 08:00 PM [Location: Famous Jigarthanda]: இரவுப் பயணத்தைத் தொடங்கும் முன் ஜிகர்தண்டா பருகி மகிழுதல்.

### நாள் 2: மலைச் சரிவுகள், ஆன்மீகம் மற்றும் பாரம்பரிய உணவுகள்
- 08:30 AM - 10:30 AM [Location: Thirupparankundram Murugan Temple]: பாறையைக் குடைந்து கட்டப்பட்ட முருகப்பெருமானின் முதலாம் அறுபடை ஆலயத்தைக் தரிசித்தல்.
- 11:00 AM - 01:00 PM [Location: Samanar Hills]: வரலாற்றுப் புகழ்பெற்ற சமணர் மலை குகைகள், பழங்காலத் தமிழ் பிராமி கல்வெட்டுகள் மற்றும் மலையுச்சியின் இயற்கைக் காட்சிகளைக் காணுதல்.
- 01:30 PM - 02:30 PM [Location: Konar Kadai]: மதிய உணவாக மதுரையின் புகழ்பெற்ற ஸ்பெஷல் முட்டைக் கறி தோசையை ருசித்தல்.
- 03:30 PM - 05:30 PM [Location: Alagar Kovil]: மலை அடிவாரத்தில் உள்ள சோலைமலை சுந்தரராஜ பெருமாளைத் தரிசித்து, அருகிலுள்ள பழமுதிர்சோலை முருகன் ஆலயத்திற்கும் விஜயம் செய்தல்.
- 06:00 PM - 07:30 PM [Location: Puthu Mandapam]: இறுதியாக பாரம்பரிய சுங்குடி காட்டன் சேலைகள் மற்றும் நினைவுப் பொருட்களை வாங்கி உங்கள் மதுரைப் பயணத்தை நிறைவு செய்தல்!`;
        } else {
          return `Here is a beautiful and comprehensive 2-Day custom trip itinerary for Madurai, professionally designed for an unforgettable cultural journey:

### Day 1: Spiritual Divine & Ancient Royalty
- 08:30 AM - 11:30 AM [Location: Meenakshi Amman Temple]: Walk through the magical portals of the historic Meenakshi temple, explore the thousand-pillar hall and capture the spiritual breeze.
- 11:45 AM - 01:00 PM [Location: Thirumalai Nayakkar Mahal]: Dive into royalty, marvel at the monolithic giant pillars and gorgeous stucco art.
- 01:00 PM - 02:00 PM [Location: Murugan Idli Shop]: Treat yourself to authentic soft idlis with rich variety chutneys for a true local lunch.
- 02:30 PM - 04:30 PM [Location: Gandhi Memorial Museum]: Learn about Indian freedom heritage through historical gallery collections and relics.
- 05:00 PM - 06:30 PM [Location: Vandiyur Mariamman Teppakulam]: Witness a peaceful sunset behind the massive temple tank pond featuring a gorgeous central mandapam.
- 07:00 PM - 08:00 PM [Location: Famous Jigarthanda]: Recharge your energy with a legendary super-chilled creamy glass of original Jigarthanda!

### Day 2: Hill Caves, Scenic Escapes, & Street Eats
- 08:30 AM - 10:30 AM [Location: Thirupparankundram Murugan Temple]: Visit the fascinating religious cave temple carved entirely directly out of a giant granite hill.
- 11:00 AM - 01:00 PM [Location: Samanar Hills]: Hike up to observe beautifully preserved Jain stone beds, ancient rock-cut carvings and panoramic green scenery.
- 01:30 PM - 02:30 PM [Location: Konar Kadai]: Savor the outstanding, globally famous Kari Dosai (Rice pancake overlaid with comforting mutton-egg mix) for a spicy local lunch.
- 03:30 PM - 05:30 PM [Location: Alagar Kovil]: Drive down to the foot of Alagar hill to explore the ancient fortress-temple of Lord Kallazhagar, and the nearby Pazhamudhircholai Murugan Shrine hidden in forest heights.
- 06:00 PM - 07:30 PM [Location: Puthu Mandapam]: Buy pure cotton Sungudi sarees, antique bronze lamps and lovely wooden crafts directly from local artisans.

Do you need help with transport paths or stays for this plan? I'm happy to assist!`;
        }
      } else {
        // Standard 1-Day Trip
        if (isTa) {
          return `மதுரையை ஒரு நாளில் முழுமையாகக் காண இதோ குறுகிய மற்றும் நுணுக்கமான 1 நாள் பயணத் திட்டம்:

- 08:30 AM - 11:30 AM [Location: Meenakshi Amman Temple]: அதிகாலையில் மீனாட்சி சொக்கேசர் தரிசனம் மற்றும் ஆயிரம் கால் மண்டபத்தின் அற்புதமான கோபுரங்களை தரிசித்தல்.
- 11:45 AM - 01:00 PM [Location: Thirumalai Nayakkar Mahal]: நாயக்கர் அரண்மனைக்கு விஜயம் செய்து வரலாற்று ராஜ கம்பீரத்தைக் காணுதல்.
- 01:00 PM - 02:00 PM [Location: Murugan Idli Shop]: முருகேசன் இட்லி கடையில் பாரம்பரிய மெதுவான நெய் இட்லிகள் மற்றும் மதிய உணவு.
- 02:30 PM - 04:30 PM [Location: Gandhi Memorial Museum]: அமைதி ததும்பும் சூழலில் காந்தி அருங்காட்சியகத்தைக் கண்டு களித்தல்.
- 05:00 PM - 06:30 PM [Location: Vandiyur Mariamman Teppakulam]: தெப்பக்குளத்தின் கரையில் மாலை நேரக் காற்றை அனுபவித்து ரசித்தல்.
- 07:00 PM - 08:30 PM [Location: Famous Jigarthanda]: நாவில் கரையும் அசல் ஜிகர்தண்டா பருகி உங்கள் பயணத்தை இனிதே நிறைவு செய்தல்!`;
        } else {
          return `Here is a perfect 1-Day Trip itinerary optimized to experience the supreme essence of Madurai beautifully:

- 08:30 AM - 11:30 AM [Location: Meenakshi Amman Temple]: Begin with an early morning visit to the legendary temple shrines, exploring ancient mandapams and capturing Pandya energy.
- 11:45 AM - 01:00 PM [Location: Thirumalai Nayakkar Mahal]: Tour the majestic 17th-century court halls with towering majestic arches and royal exhibits.
- 01:00 PM - 02:00 PM [Location: Murugan Idli Shop]: Delight in the world-class soft idlis and tasty spice chutneys for a perfect authentic lunch.
- 02:30 PM - 04:30 PM [Location: Gandhi Memorial Museum]: Immerse in peace, seeing the precious personal collection representing Mahatma Gandhi's history.
- 05:00 PM - 06:30 PM [Location: Vandiyur Mariamman Teppakulam]: Sit by the steps of the giant temple tank, watching beautiful sunset colors over the temple island.
- 07:00 PM - 08:30 PM [Location: Famous Jigarthanda]: Complete your wonderful trip with an iconic sweet glass of fresh, cooling Jigarthanda!`;
        }
      }
    } else {
      // General city fallback itinerary
      if (isTa) {
        return `${cName} நகரத்தை ஒரு நாளில் சுலபமாகச் சுற்றி வர 1 நாள் பயணத் திட்டம் இதோ:

- 09:00 AM - 11:30 AM [Location: ${cName} Central Heritage Site]: நகரத்தின் உன்னதமான வரலாற்று மற்றும் பாரம்பரியத் தலங்களை கண்டறிதல்.
- 12:00 PM - 01:30 PM [Location: ${cName} Traditional Mess]: சிறந்த பருவகால உணவுகளை ருசித்தல்.
- 02:30 PM - 04:30 PM [Location: ${cName} Botanical Park]: பசுமையான தாவரங்கள் நிறைந்த அமைதியான பூங்காவில் நடைபயணம் செய்தல்.
- 05:00 PM - 07:00 PM [Location: ${cName} Town Viewpoint]: மறக்க முடியாத சூரிய அஸ்தமனக் காட்சியை மலையுச்சியிலிருந்து ரசித்தல்.

இந்தத் திட்டம் தங்களுக்குப் பிடிக்கும் என்று நம்புகிறேன்!`;
      } else {
        return `Here is a wonderful 1-Day Trip itinerary designed to experience the absolute best of ${cName}:

- 09:00 AM - 11:30 AM [Location: ${cName} Central Heritage Site]: Discover local archaeology, stone reliefs, and historic architecture.
- 12:00 PM - 01:30 PM [Location: ${cName} Traditional Mess]: Enjoy an outstanding traditional lunch made by local family chefs.
- 02:30 PM - 04:30 PM [Location: ${cName} Botanical Park]: Take a calming nature stroll surrounded by organic pathways and beautiful local flowers.
- 05:00 PM - 07:00 PM [Location: ${cName} Town Viewpoint]: Finish your day witnessing a scenic golden-hour sunset from the highest peak point overlooking the town.

Does this itinerary match the style of your trip?`;
      }
    }
  }

  // 6. GREETING FALLBACK (Checked sixth, only if no specific topic keywords are matched)
  if (matchWholeWords(normMsg, ['hi', 'hello', 'hey', 'vanakkam', 'hai']) || normMsg.includes('வணக்கம்')) {
    const isMadurai = cLower.includes('madurai') || cLower.includes('மதுரை');
    if (isTa) {
      return isMadurai
        ? `வணக்கம்! உங்கள் நாள் எப்படிப் போகிறது? உங்களுடன் உரையாடுவதில் எனக்கு மிகவும் மகிழ்ச்சி. நீங்கள் ${cName} நகரைச் சுற்றிப் பார்க்க விரும்பினால், புகழ்பெற்ற [Location: Meenakshi Amman Temple] பற்றிய கதைகள், காரசாரமான கறி தோசை கிடைக்கும் சிறந்த இடங்கள் அல்லது ஒரு அருமையான பயணத் திட்டத்தைப் பற்றி நாம் பேசலாம். இன்று எதைப் பற்றிப் பேசலாம்?`
        : `வணக்கம்! உங்கள் நாள் எப்படிப் போகிறது? உங்களுடன் உரையாடுவதில் எனக்கு மிகவும் மகிழ்ச்சி. நீங்கள் ${cName} நகரைச் சுற்றிப் பார்க்க விரும்பினால், அதன் புகழ்பெற்ற [Location: ${cName} Central Heritage Site] போன்ற வரலாற்று இடங்கள், சுவையான உள்ளூர் உணவுகள் கிடைக்கும் சிறந்த இடங்கள் அல்லது ஒரு அருமையான பயணத் திட்டத்தைப் பற்றி நாம் பேசலாம். இன்று எதைப் பற்றிப் பேசலாம்?`;
    } else {
      return isMadurai
        ? `Hey there! How's your day going? I'm happy to help you today. If you're interested in exploring ${cName}, I can tell you all about the legendary [Location: Meenakshi Amman Temple], suggest mouth-watering local spots for Kari Dosa and Jigarthanda, or help you map out a custom travel plan. What's on your mind?`
        : `Hey there! How's your day going? I'm happy to help you today. If you're interested in exploring ${cName}, I can tell you all about the beautiful [Location: ${cName} Central Heritage Site], suggest mouth-watering local spots for traditional food, or help you map out a custom travel plan. What's on your mind?`;
    }
  }

  // 7. DEFAULT GENERIC HELP FALLBACK
  const isMadurai = cLower.includes('madurai') || cLower.includes('மதுரை');
  if (isTa) {
    return isMadurai
      ? `நிச்சயமாக, உங்களுக்கு உதவ நான் தயாராக இருக்கிறேன்! இன்று எதைப் பற்றிப் பேசலாம் என்று கூறுங்கள். நீங்கள் ${cName} பற்றித் தெரிந்துகொள்ள விரும்பினால், புகழ்பெற்ற [Location: Meenakshi Amman Temple] போன்ற வரலாற்று இடங்கள், சுவையான பாரம்பரிய உணவுகள் கிடைக்கும் [FOOD_SHOP: Murugan Idli Shop | West Tower Street, Madurai | 4.6], அல்லது தனித்துவமான பயணத் திட்டங்களைப் பற்றி நாம் பேசலாம். எதைப் பற்றி வேண்டுமானாலும் தாராளமாகக் கேளுங்கள்!`
      : `நிச்சயமாக, உங்களுக்கு உதவ நான் தயாராக இருக்கிறேன்! இன்று எதைப் பற்றிப் பேசலாம் என்று கூறுங்கள். நீங்கள் ${cName} பற்றித் தெரிந்துகொள்ள விரும்பினால், புகழ்பெற்ற [Location: ${cName} Famous Temple] போன்ற வரலாற்று இடங்கள், சுவையான பாரம்பரிய உணவுகள் கிடைக்கும் சிறந்த உணவகங்கள், அல்லது தனித்துவமான பயணத் திட்டங்களைப் பற்றி நாம் பேசலாம். எதைப் பற்றி வேண்டுமானாலும் தாராளமாகக் கேளுங்கள்!`;
  } else {
    return isMadurai
      ? `I can absolutely help you with that! Just let me know what you want to talk about. If it's about ${cName}, we can explore its rich history with beautiful places like [Location: Meenakshi Amman Temple], check traditional food spots like [FOOD_SHOP: Murugan Idli Shop | West Tower Street, Madurai | 4.6], or design a custom trip plan. Ask me anything!`
      : `I can absolutely help you with that! Just let me know what you want to talk about. If it's about ${cName}, we can explore its rich history with beautiful places like [Location: ${cName} Famous Temple], check traditional food spots like [FOOD_SHOP: ${cName} Traditional Mess | Town Center | 4.4], or design a custom trip plan. Ask me anything!`;
  }
};

export const getGeminiResponse = async (
  userMessage: string, 
  history: { role: 'user' | 'model', parts: any[] }[], 
  city: string = "Madurai", 
  lang: 'en' | 'ta' = 'en', 
  location?: {lat: number, lng: number},
  attachments?: { data: string, mimeType: string }[]
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || 'AIzaSyDNaJGMHfkwiJmhnm47RTQ2aHOlDXoICgA' });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { 
          role: 'user', 
          parts: [
            { text: userMessage },
            ...(attachments || []).map(att => ({
              inlineData: {
                data: att.data,
                mimeType: att.mimeType
              }
            }))
          ]
        }
      ],
      config: {
        systemInstruction: getSystemInstruction(city, lang, location),
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.warn("Gemini API error, redirecting to local offline intelligence:", error);
    return getGeminiFallbackResponse(userMessage, city, lang);
  }
};

export const getGeminiResponseStream = async (
  userMessage: string, 
  history: { role: 'user' | 'model', parts: any[] }[], 
  onChunk: (text: string, sources?: { title: string; url: string }[]) => void,
  city: string = "Madurai", 
  lang: 'en' | 'ta' = 'en',
  location?: {lat: number, lng: number},
  attachments?: { data: string, mimeType: string }[],
  isDeepSearch: boolean = true
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || 'AIzaSyDNaJGMHfkwiJmhnm47RTQ2aHOlDXoICgA' });
    
    const result = await ai.models.generateContentStream({
      model: 'gemini-3.5-flash',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { 
          role: 'user', 
          parts: [
            { text: userMessage },
            ...(attachments || []).map(att => ({
              inlineData: {
                data: att.data,
                mimeType: att.mimeType
              }
            }))
          ]
        }
      ],
      config: {
        systemInstruction: getSystemInstruction(city, lang, location),
        temperature: 0.7,
        tools: isDeepSearch ? [{ googleSearch: {} }] : undefined,
      },
    });

    let fullText = "";
    let sources: { title: string; url: string }[] = [];
    
    for await (const chunk of result) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        
        // Extract grounding metadata chunks for rich citations
        const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
        if (groundingMetadata?.groundingChunks) {
          groundingMetadata.groundingChunks.forEach((c: any) => {
            if (c.web?.uri && c.web?.title) {
              if (!sources.some(s => s.url === c.web.uri)) {
                sources.push({
                  title: c.web.title,
                  url: c.web.uri
                });
              }
            }
          });
        }
        
        onChunk(fullText, sources.length > 0 ? sources : undefined);
      }
    }

    return { text: fullText, sources: sources.length > 0 ? sources : undefined };
  } catch (error) {
    console.warn("Gemini streaming error, activating local high-speed fallback generator:", error);
    try {
      const fallbackText = getGeminiFallbackResponse(userMessage, city, lang);
      
      // Animate chunk-by-chunk delivery to match professional streaming experience
      const chunkSize = 8;
      let currentLength = 0;
      
      while (currentLength < fallbackText.length) {
        currentLength += chunkSize;
        onChunk(fallbackText.substring(0, currentLength), undefined);
        await new Promise(resolve => setTimeout(resolve, 8));
      }
      
      return { text: fallbackText };
    } catch (fallbackError) {
      console.error("Deep fallback failed as well:", fallbackError);
      const errTxt = "I'm having a little trouble connecting right now, but please ask me about tourist locations, temples, or local street food options!";
      onChunk(errTxt, undefined);
      return { text: errTxt };
    }
  }
};

export const improvePrompt = async (prompt: string, city: string = "Madurai"): Promise<string> => {
  if (!prompt.trim()) return "";
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || 'AIzaSyDNaJGMHfkwiJmhnm47RTQ2aHOlDXoICgA' });
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Transform this short query about "${city}" into a highly detailed, professional, and descriptive prompt for a travel assistant. Make it clear, smart, and aimed at getting the best recommendations. Keep it under 60 words: "${prompt}"`,
    });
    return response.text?.trim().replace(/^"|"$/g, '') || prompt; 
  } catch (error) {
    console.warn("Failed to improve prompt using AI:", error);
    const lower = prompt.toLowerCase().trim();
    if (lower === 'idli' || lower === 'food' || lower === 'eat' || lower === 'hotel') {
      return `Recommend the absolute best local places to eat traditional street food, Kari Dosai, and sweet jigarthanda in ${city}, including specific ratings, addresses, and must-try specialties.`;
    }
    if (lower === 'temple' || lower === 'temples' || lower === 'sightseeing' || lower === 'places') {
      return `Provide a comprehensive guide to historical temples, hills, and monuments in ${city} with rich historic backgrounds, visiting hours, and direct local insights.`;
    }
    if (lower === 'itinerary' || lower === 'planning' || lower === 'trip') {
      return `Create a highly organized and efficient 2-day step-by-step travel itinerary for ${city} detailing exact hourly timelines, maps destinations, and recommended family dining locations.`;
    }
    return `Can you give me a highly detailed, engaging, and comprehensive guide about "${prompt}" in the context of ${city}, including helpful local hints and tour recommendations?`;
  }
};

export const generateLocalFollowUps = (response: string, city: string, lang: 'en' | 'ta'): string[] => {
  const norm = response.toLowerCase();
  const isTa = lang === 'ta';
  const isMadurai = city.toLowerCase().includes('madurai') || city.toLowerCase().includes('மதுரை');
  
  if (norm.includes('murugan idli') || norm.includes('idli') || norm.includes('kari dosai') || norm.includes('konar kadai') || norm.includes('food') || norm.includes('சாப்பாடு')) {
    if (isMadurai) {
      return isTa 
        ? [`ஸ்பெஷல் ஜிகர்தண்டா எங்கு கிடைக்கும்?`, `நெய் இட்லி விலைப் பட்டியல் என்ன?`, `மதிய உணவுக்கு சிறந்த மெஸ் எது?`]
        : [`Where is the famous Jigarthanda shop?`, `What is the price of Ghee Idli?`, `What are some premium lunch mess spots?`];
    } else {
      return isTa
        ? [`${city} பாரம்பரிய உணவுகள் எங்கு கிடைக்கும்?`, `சிறந்த உள்ளூர் உணவகங்களின் பட்டியல் என்ன?`, `மதிய உணவுக்கு சிறந்த மெஸ் எது?`]
        : [`Where can I get traditional food in ${city}?`, `What is the most famous food in ${city}?`, `What are some highly-rated restaurants in ${city}?`];
    }
  }
  
  if (norm.includes('meenakshi') || norm.includes('temple') || norm.includes('கோவில்') || norm.includes('தரிசனம்')) {
    if (isMadurai) {
      return isTa
        ? [`தரிசன கட்டணங்கள் மற்றும் சிறப்பு நுழைவு சீட்டு`, `கோவிலுக்குள் போன் கொண்டு செல்லலாமா?`, `ஆயிரங்கால் மண்டப தரிசன நேரம்`]
        : [`Meenakshi temple ticket prices & special entry`, `Are cell phones and cameras allowed inside?`, `When does the Thousand Pillar Hall open?`];
    } else {
      return isTa
        ? [`${city} உள்ளூர் ஆலயங்களின் தரிசன நேரம்`, `வழிபாட்டு தலங்களின் சிறப்பு நுழைவு சீட்டு விவரம்`, `ஆலயங்களுக்கு செல்லும்போது கவனிக்க வேண்டியவை`]
        : [`What are the temple opening hours in ${city}?`, `Are there any entry fees or special tickets?`, `What is the history of the main temple in ${city}?`];
    }
  }
  
  if (norm.includes('itinerary') || norm.includes('trip') || norm.includes('day') || norm.includes('பயணம்') || norm.includes('planner')) {
    if (isMadurai) {
      return isTa
        ? [`இப்பயணத்திற்கு சிறந்த கார்/சவாரி முறைகள்`, `குடும்பத்துடன் தங்குவதற்கு சிறந்த ஹோட்டல்கள்`, `இந்த திட்டத்தை குறைந்த செலவில் செய்ய வழிகள்`]
        : [`What is the best cab or transport for this trip?`, `Top family hotels near Meenakshi Temple`, `Can we do this trip on a budget using buses?`];
    } else {
      return isTa
        ? [`${city} இப்பயணத்திற்கு சிறந்த கார்/சவாரி முறைகள்`, `${city} தங்குவதற்கு சிறந்த ஹோட்டல்கள்`, `இந்த திட்டத்தை குறைந்த செலவில் செய்ய வழிகள்`]
        : [`What is the best cab or transport for this ${city} trip?`, `Top family hotels in ${city}`, `Can we do this trip on a budget using local buses?`];
    }
  }

  if (norm.includes('shopping') || norm.includes('saree') || norm.includes('sungudi') || norm.includes('சேலை')) {
    if (isMadurai) {
      return isTa
        ? [`அசல் சுங்குடி காட்டன் சேலைகள் அடையாளம் காணுதல்`, `புது மண்டபத்தில் தையல் கடை எங்குள்ளது?`, `சிறந்த பித்தளை விளக்கு கடைகள்`]
        : [`How to identify pure Sungudi cotton sarees?`, `Best tailoring shops inside Puthu Mandapam`, `Where can I buy antique brass lamps?`];
    } else {
      return isTa
        ? [`${city} உள்ளூர் கைவினை பொருட்கள் எங்கு வாங்கலாம்?`, `${city} முக்கிய சந்தை வீதிகள் எவை?`, `சிறந்த ஜவுளி கடைகள் எங்குள்ளன?`]
        : [`Where can I buy traditional local items in ${city}?`, `What are the famous shopping areas or markets in ${city}?`, `What specialties are manufactured or woven in ${city}?`];
    }
  }
  
  return isTa
    ? [`${city} பாரம்பரிய திருவிழாக்கள் யாவை?`, `அவசரகால உதவி எண்கள் கூறு`, `அருகிலுள்ள சிறந்த குளிர் பிரதேசம் எது?`]
    : [`What are the biggest local festivals in ${city}?`, `Emergency local tourist support helpline numbers`, `What are some nearby hill stations from ${city}?`];
};
