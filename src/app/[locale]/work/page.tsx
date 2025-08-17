import { getPosts } from '@/app/utils/utils';
import WorkClient from './WorkClient';

export default function Work({ params: { locale } }: { params: { locale: string } }) {
    // Server-side data fetching
    const allProjects = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);
    return <WorkClient allProjects={allProjects} locale={locale} />;
}