import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonLoader() {
    return (
        <div>
          <h1>
            <Skeleton height={30} width={200} />
          </h1>
          <ul>
            {Array.from({length: 5}).map((_, index) => (
                <li key={index}>
                    <Skeleton height={20} width={200} />
                </li>
            ))}
          </ul>
        </div>
    );
}