import React, { useEffect, useState, useMemo } from "react";

const DataList = ({ email, setEmail }) => {
	const [mailDomains, setMailDomains] = useState({});

	const emailDomains = useMemo(
		() => [
			"gmail",
			"hotmail",
			"outlook",
			"aol",
			"aim",
			"yahoo",
			"icloud",
			"protonmail",
			"zoho",
			"yandex",
			"gmx",
			"hubspot",
			"mail",
		],
		[]
	);
	useEffect(() => {
		if (email.includes("@")) {
			const _email = email.split("@")[0];
			let domains = emailDomains.map(domain => `${mailDomains.mail || _email}@${domain}.com`);
			domains = domains.filter(domain => domain.match(new RegExp(email)));
			setMailDomains(prev => ({ show: true, mail: prev.mail || _email, domains }));
		} else if (!email.includes("@")) {
			setMailDomains({});
		}
		if (mailDomains.domains?.includes(email)) {
			setMailDomains(prev => ({ ...prev, show: false }));
		}
		// eslint-disable-next-line
	}, [email, emailDomains]);

	const updateEmail = e => {
		setEmail(e.target.value);
	};

	if (mailDomains.show)
		return (
			<datalist id="email-domains" className="email-datalist">
				{mailDomains.domains?.map(mail => (
					<option onClick={updateEmail} key={mail}>
						{mail}
					</option>
				))}
			</datalist>
		);
	return null;
};

export default DataList;
