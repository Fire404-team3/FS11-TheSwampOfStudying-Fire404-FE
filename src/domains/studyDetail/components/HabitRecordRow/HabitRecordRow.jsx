import styles from './HabitRecordRow.module.css';

import noCheckIcon from '@/assets/images/sticker_empty.svg';
import icon0 from '@/assets/checkIcon/sticker_light_green_100_01.svg';
import icon1 from '@/assets/checkIcon/sticker_light_green_100_02.svg';
import icon2 from '@/assets/checkIcon/sticker_light_green_100_03.svg';
import icon3 from '@/assets/checkIcon/sticker_light_mint_100_04.svg';
import icon4 from '@/assets/checkIcon/sticker_light_mint_200_05.svg';
import icon5 from '@/assets/checkIcon/sticker_green_06.svg';
import icon6 from '@/assets/checkIcon/sticker_blue_100_07.svg';
import icon7 from '@/assets/checkIcon/sticker_blue_200_08.svg';
import icon8 from '@/assets/checkIcon/sticker_blue_300_09.svg';
import icon9 from '@/assets/checkIcon/sticker_purple_100_10.svg';
import icon10 from '@/assets/checkIcon/sticker_purple_200_11.svg';
import icon11 from '@/assets/checkIcon/sticker_purple_300_12.svg';
import icon12 from '@/assets/checkIcon/sticker_yellow_100_13.svg';
import icon13 from '@/assets/checkIcon/sticker_yellow_200_14.svg';
import icon14 from '@/assets/checkIcon/sticker_yellow_300_15.svg';
import icon15 from '@/assets/checkIcon/sticker_pink_100_16.svg';
import icon16 from '@/assets/checkIcon/sticker_pink_200_17.svg';
import icon17 from '@/assets/checkIcon/sticker_pink_300_18.svg';

const checkIcons = [
  noCheckIcon,
  icon0,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
  icon12,
  icon13,
  icon14,
  icon15,
  icon16,
  icon17,
];

function HabitRecordRow({ habit, index }) {
  const stickerSrc = checkIcons[index];

  const records = Array.isArray(habit.records) ? habit.records : [];

  const daysOfHabitRecords = records.map((habitRecord) =>
    new Date(habitRecord.checkDate).getDay(),
  );

  const isActive = (day) => daysOfHabitRecords.includes(day);

  return (
    <div className={styles.row}>
      <div className={styles.title}>{habit.name || habit.title}</div>

      <div className={styles.days}>
        {[1, 2, 3, 4, 5, 6, 0].map((dayInNumber) => (
          <div key={dayInNumber}>
            <img
              src={isActive(dayInNumber) ? stickerSrc : noCheckIcon}
              className={styles.sticker}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitRecordRow;
