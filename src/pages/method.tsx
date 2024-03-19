import { Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

type PropType = {
    name: string,
    teams: number,
    studentTeams: number,
    fees: number,
    studentFees: number,
    groups: number,
    minGames: number,
    ballCost: number,
    trophyCost: number,
    misc: number,
}

const Method = (props: PropType) => {
    const { name, teams, studentTeams, fees, studentFees, groups, minGames, ballCost, trophyCost, misc } = props;
	const [minMatches, setMinMatches] = useState <number> (0);
	const [totalGames, setTotalGames] = useState <number> (0);

    useEffect(() => {
        if (name.toLowerCase() === "knockout") {
            knockout();
        } else if (name.toLowerCase() === "round robin") {
            if (minGames !== 0) {
                advancedRoundRobin();
            } else {
                roundRobin();
            }
        }
    }, [teams, fees, groups, minGames]);

	const knockout = () => {
		let matches: number = 0;
		let stages: number = 0;
		let participatingTeams = teams + studentTeams;
		while (participatingTeams > 1) {
			if (participatingTeams % 2 === 1) {
				participatingTeams -= 1;
			}
			stages += 1;
			matches += Math.floor(participatingTeams / 2);
			participatingTeams /= 2;
		}
        setMinMatches(Math.min(1, participatingTeams));
		setTotalGames(matches);
	}

	const roundRobin = () => {
        let grps = groups || 1;
        let totTeams = teams + studentTeams;
		const extraTeams: number = teams % grps;
		const teamsPerGroup: number = Math.floor(totTeams / grps);
		const groupStageGames: number = (teamsPerGroup * (teamsPerGroup - 1) / 2) * grps;
		const extraGames: number = extraTeams * teamsPerGroup;
		const totalGroupStage: number = groupStageGames + extraGames;
		const semiFinal: number = 2, final: number = 1;
        setMinMatches(teamsPerGroup - 1);
		setTotalGames(totalGroupStage + semiFinal + final);
	}

	const advancedRoundRobin = () => {
        let grps = groups || 1;
        let totTeams = teams + studentTeams;
		const extraTeams: number = totTeams % grps;
		const teamsPerGroup: number = Math.floor(totTeams / grps);
		let matches: number = 0;
		for (let i: number = 0; i < extraTeams; i++) {
			const totalTeams: number = teamsPerGroup + 1;
			matches += Math.floor((totalTeams * minGames) / 2);
		}
		for (let i: number = 0; i < (grps - extraTeams); i++) {
			matches += Math.floor((teamsPerGroup * minGames) / 2);
		}
		const semiFinal: number = 2, final: number = 1;
        setMinMatches(minGames);
		setTotalGames(matches + semiFinal + final);
	}

    return (
        <Flex bgColor="whitesmoke" rounded={"md"} p={10} shadow={"sm"} direction={"column"}
        gap={"30px"} color={minGames !== 0 && name.toLowerCase() === "knockout" ? "lightgray" : "black"}>
            <Heading size={"md"}>{ minGames !== 0 && name.toLowerCase() === "round robin" ? "ALTERED RR" : name }</Heading>
            <Flex direction={"column"} gap={"20px"} alignItems={"center"}>
                <Text>{ teams + studentTeams }</Text>
                <Text>{ groups }</Text>
                <Text>{ minMatches }</Text>
                <Text>{ name.toLowerCase() === "knockout" ? 0 : totalGames - 3 }</Text>
                <Text>{ totalGames }</Text>
                <Text>{ totalGames * 1.5 || 0 } hrs</Text>
                <Text>{ totalGames * 2 }</Text>
                <Text>{ Math.min(totalGames, 10) }</Text>
                <Text>${ ballCost }</Text>
                <Text>${ ballCost * (totalGames * 2 + Math.min(totalGames, 10)) }</Text>
                <Text>${ trophyCost }</Text>
                <Text>${ misc }</Text>
                <Text>${ ballCost * (totalGames * 2 + Math.min(totalGames, 10)) + trophyCost + misc }</Text>
                <Text>${ fees * teams + studentFees * studentTeams }</Text>
                <Text>${ fees * teams + studentFees * studentTeams - ballCost * (totalGames * 2 + Math.min(totalGames, 10)) - trophyCost - misc }</Text>
            </Flex>
        </Flex>
    )
}

export default Method;