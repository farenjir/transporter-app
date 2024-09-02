import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Tour } from "antd";

import { useTourStore } from "./index.store";
import { getFromStorage, setToStorage } from "utils/storage";

import { useAppContext } from "hooks";

const tourTimeout = getFromStorage("tour");

const AppTour = () => {
	const { t } = useTranslation();
	const { placement, dePlacement } = useAppContext();
	const { setReferences, open, setOpen } = useTourStore();
	// header references
	const profileRef = useRef(null);
	const sendTypeRef = useRef(null);
	const getTypeRef = useRef(null);
	const settingRef = useRef(null);

	// home references
	const searchSendRef = useRef(null);
	const requestSendRef = useRef(null);
	const componentRef = useRef(null);

	const steps = [
		{
			title: t("tour.profileRef"),
			description: t("tour.profileRefDes"),
			target: () => profileRef.current,
			placement: placement,
		},
		{
			title: t("tour.sendTypeRef"),
			description: t("tour.sendTypeRefDes"),
			target: () => sendTypeRef.current,
		},
		{
			title: t("tour.getTypeRef"),
			description: t("tour.getTypeRefDes"),
			target: () => getTypeRef.current,
		},
		{
			title: t("tour.settingRef"),
			description: t("tour.settingRefDes"),
			target: () => settingRef.current,
			placement: dePlacement,
		},
		{
			title: t("tour.searchSendRef"),
			description: t("tour.searchSendRefDes"),
			target: () => searchSendRef.current,
		},
		{
			title: t("tour.requestSendRef"),
			description: t("tour.requestSendRefDes"),
			target: () => requestSendRef.current,
		},
		{
			title: t("tour.componentRef"),
			description: t("tour.componentRefDes"),
			target: () => componentRef.current,
		},
	];

	useEffect(() => {
		if (!tourTimeout) {
			setTimeout(() => {
				setReferences({ searchSendRef, requestSendRef, componentRef, profileRef, sendTypeRef, getTypeRef, settingRef });
				setOpen(true);
				setToStorage("tour", { checked: true });
			}, 5000);
		}
	}, []);

	return (
		<Tour
			open={open}
			onClose={() => setOpen(false)}
			steps={steps}
			animated
			arrow
			closable
		/>
	);
};

export default AppTour;
