import React, { useState, useEffect } from 'react';

const AddNewChall = () => {
    const [PrimaryKey, setPrimaryKey] = useState('');
    const [ChallengeName, setChallengeName] = useState('');
    const [SocialMax, setSocialMax] = useState('');
    const [SocialMin, setSocialMin] = useState('');
    const [EmotionalMax, setEmotionalMax] = useState('');
    const [EmotionalMin, setEmotionalMin] = useState('');
    const [StudyMax, setStudyMax] = useState('');
    const [StudyMin, setStudyMin] = useState('');
    const [Personal, setPersonal] = useState('0');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://localhost:3000/AddNewChall');
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        const user = {
            PrimaryKey: PrimaryKey,
            ChallengeName: ChallengeName,
            SocialMax: SocialMax,
            SocialMin: SocialMin,
            EmotionalMax: EmotionalMax,
            EmotionalMin: EmotionalMin,
            StudyMax: StudyMax,
            StudyMin: StudyMin,
            Personal: Personal,
        };

        fetch('http://127.0.0.1:8000/api/v1/users/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }
            })
            .then(data => {
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://localhost:3000/dashboard');
                } else {
                    setPrimaryKey('');
                    setChallengeName('');
                    setSocialMax('');
                    setSocialMin('');
                    setEmotionalMax('');
                    setEmotionalMin('');
                    setStudyMax('');
                    setStudyMin('');
                    setPersonal('');
                    localStorage.clear();
                    setErrors(true);
                }
            });
    };

    return (
        <div>
            {loading === false && <h1>Signup</h1>}
            {errors === true && <h2>Cannot signup with provided credentials</h2>}
            <form onSubmit={onSubmit}>
                <label htmlFor='PrimaryKey'>PrimaryKey:</label> <br />
                <input
                    name='PrimaryKey'
                    type='number'
                    value={PrimaryKey}
                    onChange={e => setPrimaryKey(e.target.value)}
                    required
                />{' '}

                <br />

                <label htmlFor='ChallengeName'>ChallengeName:</label> <br />
                <input
                    name='ChallengeName'
                    type='text'
                    value={ChallengeName}
                    onChange={e => setChallengeName(e.target.value)}
                    required
                />{' '}

                <br />

                <label htmlFor='SocialMax'>SocialMax:</label> <br />
                <input
                    name='SocialMax'
                    type='number'
                    value={SocialMax}
                    onChange={e => setSocialMax(e.target.value)}
                    required
                />{' '}

                <br />

                <label htmlFor='SocialMin'>SocialMin:</label> <br />
                <input
                    name='SocialMin'
                    type='number'
                    value={SocialMin}
                    onChange={e => setSocialMin(e.target.value)}
                    required
                />{' '}

                <br />

                <label htmlFor='StudyMin'>StudyMin:</label> <br />
                <input
                    name='StudyMin'
                    type='number'
                    value={StudyMin}
                    onChange={e => setStudyMin(e.target.value)}
                    required
                />{' '}
                <br />
                <label htmlFor='EmotionalMax'>EmotionalMax:</label> <br />
                <input
                    name='EmotionalMax'
                    type='number'
                    value={EmotionalMax}
                    onChange={e => setEmotionalMax(e.target.value)}
                    required
                />{' '}
                <br />
                <label htmlFor='EmotionalMin'>EmotionalMin:</label> <br />
                <input
                    name='EmotionalMin'
                    type='number'
                    value={EmotionalMin}
                    onChange={e => setEmotionalMin(e.target.value)}
                    required
                />{' '}
                <br />
                <label htmlFor='StudyMax'>StudyMax:</label> <br />
                <input
                    name='StudyMax'
                    type='number'
                    value={StudyMax}
                    onChange={e => setStudyMax(e.target.value)}
                    required
                />{' '}
                <br />
                <label htmlFor='Personal'>Personal:</label> <br />
                <input
                    name='Personal'
                    type='number'
                    value={Personal}
                    onChange={e => setPersonal(e.target.value)}
                    required
                />{' '}
                <br />


                <input type='submit' value='Signup' />
            </form>
        </div>
    );
};

export default AddNewChall;
