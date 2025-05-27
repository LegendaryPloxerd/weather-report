export async function getWeather(city) {

    const apiKey = '7db065666bb844b729dde5ed8b2016e8';
    if (!city) return null;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('City not found');
        const data = await res.json();
        return data;
    }
    catch (err) {
        throw new Error(err)
    }
}


