import React, { FormEvent, FunctionComponent, useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import { NextPageContext } from 'next';
import { prisma } from 'lib/db/prisma';
import Label from 'components/atoms/Label';
import Input from 'components/atoms/Input';
import Checkbox from 'components/atoms/Checkbox';
import Select from 'components/atoms/Select';

interface IHistory {
  cpm: number;
  accuracy: number;
  mode: string;
  id: string;
  createdAt: Date;
}

interface OwnProps {
  history: IHistory[] | null;
  status: number;
}

type Props = OwnProps;

const UserHistoryPage: FunctionComponent<Props> = ({ history, status }) => {
  const [showModes, setShowModes] = useState<string[]>([
    '10w',
    '50w',
    '100w',
    '200w',
    '0.5m',
    '1m',
    '2m',
  ]);

  if (!history) {
    return (
      <MainTemplate title={'History not found :('}>
        <div className={'mx-auto py-[20vh] text-center'}>
          <h1 className={'text-4xl font-bold'}>404</h1>
          <h2 className={'mt-4 text-text-secondary font-medium'}>
            Whoops... I can&apos;t find the user&apos;s history :(
          </h2>
        </div>
      </MainTemplate>
    );
  }

  const handleToggleMode = (e: FormEvent<HTMLInputElement>) => {
    const mode: string = (e.target as HTMLInputElement).name;

    if (showModes.includes(mode)) setShowModes((prev) => prev.filter((item) => item !== mode));
    else setShowModes((prev) => [...prev, mode]);
  };

  const filteredHistory = history.filter((item: IHistory) => showModes.includes(item.mode));

  return (
    <MainTemplate title={'History'}>
      <section className={'pt-10 mb-10'}>
        <h1 className={'font-bold text-2xl'}>History</h1>
      </section>
      <section className={'flex gap-x-12 items-start'}>
        <section className={'flex-1'}>
          <div className={'flex flex-col'}>
            <Label htmlFor={'sort'}>Sort by</Label>
            <Select id={'sort'}>
              <option>Newest</option>
              <option>Oldest</option>
              <option>Fastest</option>
              <option>Slowest</option>
              <option>Best accuracy</option>
              <option>Worst accuracy</option>
            </Select>
          </div>

          <div className={'mt-8'}>
            <p className={'text-gray-300 mb-[6px] ml-1 text-sm'}>Mode</p>
            <div className={'flex flex-col gap-y-1'}>
              <Checkbox
                onClick={handleToggleMode}
                label={'10 Words'}
                id={'10w'}
                name={'10w'}
                checked={showModes.includes('10w')}
              />
              <Checkbox
                onClick={handleToggleMode}
                label={'50 Words'}
                id={'50w'}
                name={'50w'}
                checked={showModes.includes('50w')}
              />
              <Checkbox
                onClick={handleToggleMode}
                label={'100 Words'}
                id={'100w'}
                name={'100w'}
                checked={showModes.includes('100w')}
              />
              <Checkbox
                onClick={handleToggleMode}
                label={'200 Words'}
                id={'200w'}
                name={'200w'}
                checked={showModes.includes('200w')}
              />
              <Checkbox
                onClick={handleToggleMode}
                label={'30 Seconds'}
                id={'0.5m'}
                name={'0.5m'}
                checked={showModes.includes('0.5m')}
              />
              <Checkbox
                onClick={handleToggleMode}
                label={'1 Minute'}
                id={'1m'}
                name={'1m'}
                checked={showModes.includes('1m')}
              />
              <Checkbox
                onClick={handleToggleMode}
                label={'2 Minutes'}
                id={'2m'}
                name={'2m'}
                checked={showModes.includes('2m')}
              />
            </div>
          </div>
        </section>
        <section className={'bg-light border border-gray-900 rounded-lg p-5 shadow-xl flex-[4]'}>
          {filteredHistory.map(({ id, mode, createdAt, cpm, accuracy }, index) => (
            <div
              key={id}
              className={`${index > 0 ? 'border-t border-t-gray-900/80 pt-4 mt-4' : ''}`}
            >
              <div className={'flex justify-between'}>
                <div className={'flex gap-x-4'}>
                  <p className={'text-sm text-text-tertiary/90 font-medium'}>ID {id}</p>
                  <p className={'text-sm text-text-tertiary/90 font-medium'}>{mode}</p>
                </div>
                <div>
                  <p className={'text-sm text-text-tertiary/90 font-medium'}>
                    {new Date(createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className={'flex gap-x-6 mt-5'}>
                <p className={'font-medium'}>
                  {(cpm / 5).toFixed(1)}{' '}
                  <span className={'text-text-tertiary text-sm font-semibold'}>WPM</span>
                </p>
                <p className={'font-medium'}>
                  {cpm} <span className={'text-text-tertiary text-sm font-semibold'}>CPM</span>
                </p>
                <p className={'font-medium'}>
                  {accuracy.toFixed(2)}%{' '}
                  <span className={'text-text-tertiary text-sm font-semibold'}>Accuracy</span>
                </p>
              </div>
            </div>
          ))}
        </section>
      </section>
    </MainTemplate>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const username = context.query.username as string;
  if (!username) {
    return { props: { history: null, status: 404 } };
  }

  const history = await prisma.speedTest.findMany({
    where: { user: { username } },
    select: {
      cpm: true,
      accuracy: true,
      mode: true,
      id: true,
      createdAt: true,
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  if (!history) {
    return { props: { history: null, status: 404 } };
  }

  return { props: { history: JSON.parse(JSON.stringify(history)), status: 200 } };
};

export default UserHistoryPage;