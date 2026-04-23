import styles from './Insctuctions.module.css';
import Image from 'next/image';

export default function Instructions() {
  return (
    <div className={styles.userGuideWrapper}>
      <div className={styles.userGuide}>
        <div className={styles.guideSection}>
          <div className={styles.guideTitle}>
            <Image
              src="/icons/questionIcon.png"
              alt="question mark icon"
              width={70}
              height={25}
              priority
            ></Image>
            <h2>How to Use Recipo</h2>
          </div>
          <ul>
            <li>
              Paste a <strong>YouTube cooking video URL</strong> into the search
              bar and submit.
            </li>
            <li>
              The app will automatically extract and generate a structured
              recipe from the video.
            </li>
          </ul>
        </div>
        <div className={styles.guideSection}>
          <div className={styles.guideTitle}>
            <Image
              src="/icons/starIcon.png"
              alt="question mark icon"
              width={70}
              height={25}
              priority
            ></Image>
            <h2>Important Notes</h2>
          </div>
          <ul>
            <li>
              Recipes are generated using{' '}
              <strong>AI based on the video’s transcript</strong>.
            </li>
            <li>
              If the video{' '}
              <strong>does not include spoken instructions </strong>
              or{' '}
              <strong>
                does not have an available transcript (including auto-generated
                captions)
              </strong>
              , the recipe may not be displayed or may be incomplete.
            </li>
            <li>
              The accuracy of the recipe depends on the{' '}
              <strong>quality and clarity of the transcript</strong>.
            </li>
          </ul>
        </div>
        <div className={styles.guideSection}>
          <div className={styles.guideTitle}>
            <Image
              src="/icons/conversationIcon.png"
              alt="question mark icon"
              width={70}
              height={25}
              priority
            ></Image>
            <h2>Feedback & Support</h2>
          </div>
          <ul>
            <li>
              If you encounter any{' '}
              <strong>errors, bugs, or unexpected results</strong>, please let
              me know.
            </li>
            <li>
              Your feedback is extremely valuable and helps improve the
              application.
            </li>
            <li>
              I appreciate your support in making this tool better for everyone.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
