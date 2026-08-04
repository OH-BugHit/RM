import { Trans, useTranslation } from 'react-i18next';
import style from './style.module.css';
import { useRouteError } from 'react-router-dom';

export default function ErrorComponent() {
    const error = useRouteError();
    const { t } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).status === 404) {
        return (
            <section className={style.errorView}>
                <h1>{t('errorPage.notFound.title')}</h1>
                <p>
                    <Trans
                        i18nKey="errorPage.notFound.info"
                        components={{
                            Link: <a href="/" />,
                        }}
                    />
                </p>
            </section>
        );
    }

    return (
        <section className={style.errorView}>
            <h1>{t('errorPage.somethingWrong.title')}</h1>
            <p>
                <Trans
                    i18nKey="errorPage.somethingWrong.info"
                    components={{
                        Link: (
                            <a
                                href="https://github.com/OH-BugHit/RL/issues"
                                target="_blank"
                                rel="noreferrer"
                            />
                        ),
                    }}
                />
            </p>
            <p className="code">{JSON.stringify(error)}</p>
        </section>
    );
}
